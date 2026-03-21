import os
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, auth, schemas

router = APIRouter(prefix="/auth", tags=["auth"])

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5174")
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")


@router.get("/login")
def login():
    redirect_uri = f"{BACKEND_URL}/auth/callback"
    params = (
        "https://accounts.google.com/o/oauth2/v2/auth"
        f"?client_id={GOOGLE_CLIENT_ID}"
        f"&redirect_uri={redirect_uri}"
        "&response_type=code"
        "&scope=openid email profile"
        "&access_type=offline"
    )
    return RedirectResponse(params)


@router.get("/callback")
async def callback(code: str, db: Session = Depends(get_db)):
    try:
        userinfo = await auth.exchange_code_for_user(code, os.getenv("BACKEND_URL", "http://localhost:8000"))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Google auth failed: {e}")

    user = db.query(models.User).filter(models.User.google_id == userinfo["id"]).first()
    if not user:
        user = models.User(
            google_id=userinfo["id"],
            email=userinfo["email"],
            name=userinfo["name"],
            avatar=userinfo.get("picture"),
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    else:
        user.avatar = userinfo.get("picture")
        user.name = userinfo["name"]
        db.commit()

    token = auth.create_access_token(user.id, user.email)
    return RedirectResponse(f"{FRONTEND_URL}/auth/success?token={token}")


@router.get("/me", response_model=schemas.UserOut)
def get_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user  # fixed typo: was "current_users"