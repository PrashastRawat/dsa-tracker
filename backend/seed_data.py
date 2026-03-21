import sys, os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from app.database import SessionLocal, engine, Base
from app import models

Base.metadata.create_all(bind=engine)

ROADMAP = [
    {
        "name": "Arrays & Hashing", "slug": "arrays-hashing", "order_index": 1,
        "description": "Foundation of DSA. Master array manipulation and hash maps.",
        "problems": [
            {"title": "Contains Duplicate", "difficulty": "easy", "url": "https://leetcode.com/problems/contains-duplicate/", "order": 1},
            {"title": "Valid Anagram", "difficulty": "easy", "url": "https://leetcode.com/problems/valid-anagram/", "order": 2},
            {"title": "Two Sum", "difficulty": "easy", "url": "https://leetcode.com/problems/two-sum/", "order": 3},
            {"title": "Group Anagrams", "difficulty": "medium", "url": "https://leetcode.com/problems/group-anagrams/", "order": 4},
            {"title": "Top K Frequent Elements", "difficulty": "medium", "url": "https://leetcode.com/problems/top-k-frequent-elements/", "order": 5},
            {"title": "Product of Array Except Self", "difficulty": "medium", "url": "https://leetcode.com/problems/product-of-array-except-self/", "order": 6},
            {"title": "Valid Sudoku", "difficulty": "medium", "url": "https://leetcode.com/problems/valid-sudoku/", "order": 7},
            {"title": "Encode and Decode Strings", "difficulty": "medium", "url": "https://leetcode.com/problems/encode-and-decode-strings/", "order": 8},
            {"title": "Longest Consecutive Sequence", "difficulty": "medium", "url": "https://leetcode.com/problems/longest-consecutive-sequence/", "order": 9},
        ],
    },
    {
        "name": "Two Pointers", "slug": "two-pointers", "order_index": 2,
        "description": "Efficiently solve problems using two indices moving through data.",
        "problems": [
            {"title": "Valid Palindrome", "difficulty": "easy", "url": "https://leetcode.com/problems/valid-palindrome/", "order": 1},
            {"title": "Two Sum II", "difficulty": "medium", "url": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", "order": 2},
            {"title": "3Sum", "difficulty": "medium", "url": "https://leetcode.com/problems/3sum/", "order": 3},
            {"title": "Container With Most Water", "difficulty": "medium", "url": "https://leetcode.com/problems/container-with-most-water/", "order": 4},
            {"title": "Trapping Rain Water", "difficulty": "hard", "url": "https://leetcode.com/problems/trapping-rain-water/", "order": 5},
        ],
    },
    {
        "name": "Sliding Window", "slug": "sliding-window", "order_index": 3,
        "description": "Optimize subarray/substring problems with a moving window.",
        "problems": [
            {"title": "Best Time to Buy and Sell Stock", "difficulty": "easy", "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", "order": 1},
            {"title": "Longest Substring Without Repeating Characters", "difficulty": "medium", "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/", "order": 2},
            {"title": "Longest Repeating Character Replacement", "difficulty": "medium", "url": "https://leetcode.com/problems/longest-repeating-character-replacement/", "order": 3},
            {"title": "Permutation in String", "difficulty": "medium", "url": "https://leetcode.com/problems/permutation-in-string/", "order": 4},
            {"title": "Minimum Window Substring", "difficulty": "hard", "url": "https://leetcode.com/problems/minimum-window-substring/", "order": 5},
            {"title": "Sliding Window Maximum", "difficulty": "hard", "url": "https://leetcode.com/problems/sliding-window-maximum/", "order": 6},
        ],
    },
    {
        "name": "Stack", "slug": "stack", "order_index": 4,
        "description": "LIFO data structure for parsing, backtracking, and monotonic problems.",
        "problems": [
            {"title": "Valid Parentheses", "difficulty": "easy", "url": "https://leetcode.com/problems/valid-parentheses/", "order": 1},
            {"title": "Min Stack", "difficulty": "medium", "url": "https://leetcode.com/problems/min-stack/", "order": 2},
            {"title": "Evaluate Reverse Polish Notation", "difficulty": "medium", "url": "https://leetcode.com/problems/evaluate-reverse-polish-notation/", "order": 3},
            {"title": "Generate Parentheses", "difficulty": "medium", "url": "https://leetcode.com/problems/generate-parentheses/", "order": 4},
            {"title": "Daily Temperatures", "difficulty": "medium", "url": "https://leetcode.com/problems/daily-temperatures/", "order": 5},
            {"title": "Car Fleet", "difficulty": "medium", "url": "https://leetcode.com/problems/car-fleet/", "order": 6},
            {"title": "Largest Rectangle in Histogram", "difficulty": "hard", "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/", "order": 7},
        ],
    },
    {
        "name": "Binary Search", "slug": "binary-search", "order_index": 5,
        "description": "Divide and conquer on sorted data. O(log n) is the goal.",
        "problems": [
            {"title": "Binary Search", "difficulty": "easy", "url": "https://leetcode.com/problems/binary-search/", "order": 1},
            {"title": "Search a 2D Matrix", "difficulty": "medium", "url": "https://leetcode.com/problems/search-a-2d-matrix/", "order": 2},
            {"title": "Koko Eating Bananas", "difficulty": "medium", "url": "https://leetcode.com/problems/koko-eating-bananas/", "order": 3},
            {"title": "Find Minimum in Rotated Sorted Array", "difficulty": "medium", "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", "order": 4},
            {"title": "Search in Rotated Sorted Array", "difficulty": "medium", "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/", "order": 5},
            {"title": "Time Based Key-Value Store", "difficulty": "medium", "url": "https://leetcode.com/problems/time-based-key-value-store/", "order": 6},
            {"title": "Median of Two Sorted Arrays", "difficulty": "hard", "url": "https://leetcode.com/problems/median-of-two-sorted-arrays/", "order": 7},
        ],
    },
    {
        "name": "Linked List", "slug": "linked-list", "order_index": 6,
        "description": "Pointer manipulation, reversal, and classic linked list patterns.",
        "problems": [
            {"title": "Reverse Linked List", "difficulty": "easy", "url": "https://leetcode.com/problems/reverse-linked-list/", "order": 1},
            {"title": "Merge Two Sorted Lists", "difficulty": "easy", "url": "https://leetcode.com/problems/merge-two-sorted-lists/", "order": 2},
            {"title": "Reorder List", "difficulty": "medium", "url": "https://leetcode.com/problems/reorder-list/", "order": 3},
            {"title": "Remove Nth Node From End of List", "difficulty": "medium", "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", "order": 4},
            {"title": "Copy List with Random Pointer", "difficulty": "medium", "url": "https://leetcode.com/problems/copy-list-with-random-pointer/", "order": 5},
            {"title": "Add Two Numbers", "difficulty": "medium", "url": "https://leetcode.com/problems/add-two-numbers/", "order": 6},
            {"title": "Linked List Cycle", "difficulty": "easy", "url": "https://leetcode.com/problems/linked-list-cycle/", "order": 7},
            {"title": "Find the Duplicate Number", "difficulty": "medium", "url": "https://leetcode.com/problems/find-the-duplicate-number/", "order": 8},
            {"title": "LRU Cache", "difficulty": "medium", "url": "https://leetcode.com/problems/lru-cache/", "order": 9},
            {"title": "Merge K Sorted Lists", "difficulty": "hard", "url": "https://leetcode.com/problems/merge-k-sorted-lists/", "order": 10},
            {"title": "Reverse Nodes in K-Group", "difficulty": "hard", "url": "https://leetcode.com/problems/reverse-nodes-in-k-group/", "order": 11},
        ],
    },
    {
        "name": "Trees", "slug": "trees", "order_index": 7,
        "description": "Binary trees, BSTs, traversals, and recursive tree thinking.",
        "problems": [
            {"title": "Invert Binary Tree", "difficulty": "easy", "url": "https://leetcode.com/problems/invert-binary-tree/", "order": 1},
            {"title": "Maximum Depth of Binary Tree", "difficulty": "easy", "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/", "order": 2},
            {"title": "Diameter of Binary Tree", "difficulty": "easy", "url": "https://leetcode.com/problems/diameter-of-binary-tree/", "order": 3},
            {"title": "Balanced Binary Tree", "difficulty": "easy", "url": "https://leetcode.com/problems/balanced-binary-tree/", "order": 4},
            {"title": "Same Tree", "difficulty": "easy", "url": "https://leetcode.com/problems/same-tree/", "order": 5},
            {"title": "Subtree of Another Tree", "difficulty": "easy", "url": "https://leetcode.com/problems/subtree-of-another-tree/", "order": 6},
            {"title": "Lowest Common Ancestor of BST", "difficulty": "medium", "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", "order": 7},
            {"title": "Binary Tree Level Order Traversal", "difficulty": "medium", "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/", "order": 8},
            {"title": "Binary Tree Right Side View", "difficulty": "medium", "url": "https://leetcode.com/problems/binary-tree-right-side-view/", "order": 9},
            {"title": "Count Good Nodes in Binary Tree", "difficulty": "medium", "url": "https://leetcode.com/problems/count-good-nodes-in-binary-tree/", "order": 10},
            {"title": "Validate Binary Search Tree", "difficulty": "medium", "url": "https://leetcode.com/problems/validate-binary-search-tree/", "order": 11},
            {"title": "Kth Smallest Element in a BST", "difficulty": "medium", "url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", "order": 12},
            {"title": "Construct Binary Tree from Preorder and Inorder", "difficulty": "medium", "url": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", "order": 13},
            {"title": "Binary Tree Maximum Path Sum", "difficulty": "hard", "url": "https://leetcode.com/problems/binary-tree-maximum-path-sum/", "order": 14},
            {"title": "Serialize and Deserialize Binary Tree", "difficulty": "hard", "url": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", "order": 15},
        ],
    },
    {
        "name": "Tries", "slug": "tries", "order_index": 8,
        "description": "Prefix trees for efficient string search and autocomplete.",
        "problems": [
            {"title": "Implement Trie (Prefix Tree)", "difficulty": "medium", "url": "https://leetcode.com/problems/implement-trie-prefix-tree/", "order": 1},
            {"title": "Design Add and Search Words Data Structure", "difficulty": "medium", "url": "https://leetcode.com/problems/design-add-and-search-words-data-structure/", "order": 2},
            {"title": "Word Search II", "difficulty": "hard", "url": "https://leetcode.com/problems/word-search-ii/", "order": 3},
        ],
    },
    {
        "name": "Heap / Priority Queue", "slug": "heap", "order_index": 9,
        "description": "Min/max heaps for k-th element and scheduling problems.",
        "problems": [
            {"title": "Kth Largest Element in a Stream", "difficulty": "easy", "url": "https://leetcode.com/problems/kth-largest-element-in-a-stream/", "order": 1},
            {"title": "Last Stone Weight", "difficulty": "easy", "url": "https://leetcode.com/problems/last-stone-weight/", "order": 2},
            {"title": "K Closest Points to Origin", "difficulty": "medium", "url": "https://leetcode.com/problems/k-closest-points-to-origin/", "order": 3},
            {"title": "Kth Largest Element in an Array", "difficulty": "medium", "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/", "order": 4},
            {"title": "Task Scheduler", "difficulty": "medium", "url": "https://leetcode.com/problems/task-scheduler/", "order": 5},
            {"title": "Design Twitter", "difficulty": "medium", "url": "https://leetcode.com/problems/design-twitter/", "order": 6},
            {"title": "Find Median from Data Stream", "difficulty": "hard", "url": "https://leetcode.com/problems/find-median-from-data-stream/", "order": 7},
        ],
    },
    {
        "name": "Backtracking", "slug": "backtracking", "order_index": 10,
        "description": "Explore all possibilities recursively, pruning invalid paths.",
        "problems": [
            {"title": "Subsets", "difficulty": "medium", "url": "https://leetcode.com/problems/subsets/", "order": 1},
            {"title": "Combination Sum", "difficulty": "medium", "url": "https://leetcode.com/problems/combination-sum/", "order": 2},
            {"title": "Combination Sum II", "difficulty": "medium", "url": "https://leetcode.com/problems/combination-sum-ii/", "order": 3},
            {"title": "Permutations", "difficulty": "medium", "url": "https://leetcode.com/problems/permutations/", "order": 4},
            {"title": "Subsets II", "difficulty": "medium", "url": "https://leetcode.com/problems/subsets-ii/", "order": 5},
            {"title": "Word Search", "difficulty": "medium", "url": "https://leetcode.com/problems/word-search/", "order": 6},
            {"title": "Palindrome Partitioning", "difficulty": "medium", "url": "https://leetcode.com/problems/palindrome-partitioning/", "order": 7},
            {"title": "Letter Combinations of a Phone Number", "difficulty": "medium", "url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", "order": 8},
            {"title": "N-Queens", "difficulty": "hard", "url": "https://leetcode.com/problems/n-queens/", "order": 9},
        ],
    },
    {
        "name": "Graphs", "slug": "graphs", "order_index": 11,
        "description": "BFS, DFS, Union-Find, and graph traversal patterns.",
        "problems": [
            {"title": "Number of Islands", "difficulty": "medium", "url": "https://leetcode.com/problems/number-of-islands/", "order": 1},
            {"title": "Clone Graph", "difficulty": "medium", "url": "https://leetcode.com/problems/clone-graph/", "order": 2},
            {"title": "Max Area of Island", "difficulty": "medium", "url": "https://leetcode.com/problems/max-area-of-island/", "order": 3},
            {"title": "Pacific Atlantic Water Flow", "difficulty": "medium", "url": "https://leetcode.com/problems/pacific-atlantic-water-flow/", "order": 4},
            {"title": "Surrounded Regions", "difficulty": "medium", "url": "https://leetcode.com/problems/surrounded-regions/", "order": 5},
            {"title": "Rotting Oranges", "difficulty": "medium", "url": "https://leetcode.com/problems/rotting-oranges/", "order": 6},
            {"title": "Course Schedule", "difficulty": "medium", "url": "https://leetcode.com/problems/course-schedule/", "order": 7},
            {"title": "Course Schedule II", "difficulty": "medium", "url": "https://leetcode.com/problems/course-schedule-ii/", "order": 8},
            {"title": "Graph Valid Tree", "difficulty": "medium", "url": "https://leetcode.com/problems/graph-valid-tree/", "order": 9},
            {"title": "Number of Connected Components", "difficulty": "medium", "url": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/", "order": 10},
            {"title": "Redundant Connection", "difficulty": "medium", "url": "https://leetcode.com/problems/redundant-connection/", "order": 11},
            {"title": "Word Ladder", "difficulty": "hard", "url": "https://leetcode.com/problems/word-ladder/", "order": 12},
        ],
    },
    {
        "name": "Advanced Graphs", "slug": "advanced-graphs", "order_index": 12,
        "description": "Dijkstra, Bellman-Ford, Prim, Kruskal and advanced graph algorithms.",
        "problems": [
            {"title": "Reconstruct Itinerary", "difficulty": "hard", "url": "https://leetcode.com/problems/reconstruct-itinerary/", "order": 1},
            {"title": "Min Cost to Connect All Points", "difficulty": "medium", "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/", "order": 2},
            {"title": "Network Delay Time", "difficulty": "medium", "url": "https://leetcode.com/problems/network-delay-time/", "order": 3},
            {"title": "Swim in Rising Water", "difficulty": "hard", "url": "https://leetcode.com/problems/swim-in-rising-water/", "order": 4},
            {"title": "Alien Dictionary", "difficulty": "hard", "url": "https://leetcode.com/problems/alien-dictionary/", "order": 5},
            {"title": "Cheapest Flights Within K Stops", "difficulty": "medium", "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/", "order": 6},
        ],
    },
    {
        "name": "Dynamic Programming", "slug": "dynamic-programming", "order_index": 13,
        "description": "Memoization, tabulation, and optimal substructure problems.",
        "problems": [
            {"title": "Climbing Stairs", "difficulty": "easy", "url": "https://leetcode.com/problems/climbing-stairs/", "order": 1},
            {"title": "Min Cost Climbing Stairs", "difficulty": "easy", "url": "https://leetcode.com/problems/min-cost-climbing-stairs/", "order": 2},
            {"title": "House Robber", "difficulty": "medium", "url": "https://leetcode.com/problems/house-robber/", "order": 3},
            {"title": "House Robber II", "difficulty": "medium", "url": "https://leetcode.com/problems/house-robber-ii/", "order": 4},
            {"title": "Longest Palindromic Substring", "difficulty": "medium", "url": "https://leetcode.com/problems/longest-palindromic-substring/", "order": 5},
            {"title": "Palindromic Substrings", "difficulty": "medium", "url": "https://leetcode.com/problems/palindromic-substrings/", "order": 6},
            {"title": "Decode Ways", "difficulty": "medium", "url": "https://leetcode.com/problems/decode-ways/", "order": 7},
            {"title": "Coin Change", "difficulty": "medium", "url": "https://leetcode.com/problems/coin-change/", "order": 8},
            {"title": "Maximum Product Subarray", "difficulty": "medium", "url": "https://leetcode.com/problems/maximum-product-subarray/", "order": 9},
            {"title": "Word Break", "difficulty": "medium", "url": "https://leetcode.com/problems/word-break/", "order": 10},
            {"title": "Longest Increasing Subsequence", "difficulty": "medium", "url": "https://leetcode.com/problems/longest-increasing-subsequence/", "order": 11},
            {"title": "Partition Equal Subset Sum", "difficulty": "medium", "url": "https://leetcode.com/problems/partition-equal-subset-sum/", "order": 12},
            {"title": "Unique Paths", "difficulty": "medium", "url": "https://leetcode.com/problems/unique-paths/", "order": 13},
            {"title": "Longest Common Subsequence", "difficulty": "medium", "url": "https://leetcode.com/problems/longest-common-subsequence/", "order": 14},
            {"title": "Best Time to Buy and Sell Stock with Cooldown", "difficulty": "medium", "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/", "order": 15},
            {"title": "Coin Change II", "difficulty": "medium", "url": "https://leetcode.com/problems/coin-change-ii/", "order": 16},
            {"title": "Target Sum", "difficulty": "medium", "url": "https://leetcode.com/problems/target-sum/", "order": 17},
            {"title": "Interleaving String", "difficulty": "medium", "url": "https://leetcode.com/problems/interleaving-string/", "order": 18},
            {"title": "Longest Increasing Path in Matrix", "difficulty": "hard", "url": "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/", "order": 19},
            {"title": "Distinct Subsequences", "difficulty": "hard", "url": "https://leetcode.com/problems/distinct-subsequences/", "order": 20},
            {"title": "Edit Distance", "difficulty": "medium", "url": "https://leetcode.com/problems/edit-distance/", "order": 21},
            {"title": "Burst Balloons", "difficulty": "hard", "url": "https://leetcode.com/problems/burst-balloons/", "order": 22},
            {"title": "Regular Expression Matching", "difficulty": "hard", "url": "https://leetcode.com/problems/regular-expression-matching/", "order": 23},
        ],
    },
    {
        "name": "Greedy", "slug": "greedy", "order_index": 14,
        "description": "Make locally optimal choices for globally optimal solutions.",
        "problems": [
            {"title": "Maximum Subarray", "difficulty": "medium", "url": "https://leetcode.com/problems/maximum-subarray/", "order": 1},
            {"title": "Jump Game", "difficulty": "medium", "url": "https://leetcode.com/problems/jump-game/", "order": 2},
            {"title": "Jump Game II", "difficulty": "medium", "url": "https://leetcode.com/problems/jump-game-ii/", "order": 3},
            {"title": "Gas Station", "difficulty": "medium", "url": "https://leetcode.com/problems/gas-station/", "order": 4},
            {"title": "Hand of Straights", "difficulty": "medium", "url": "https://leetcode.com/problems/hand-of-straights/", "order": 5},
            {"title": "Merge Triplets to Form Target Triplet", "difficulty": "medium", "url": "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/", "order": 6},
            {"title": "Partition Labels", "difficulty": "medium", "url": "https://leetcode.com/problems/partition-labels/", "order": 7},
            {"title": "Valid Parenthesis String", "difficulty": "medium", "url": "https://leetcode.com/problems/valid-parenthesis-string/", "order": 8},
        ],
    },
    {
        "name": "Intervals", "slug": "intervals", "order_index": 15,
        "description": "Merge, insert, and reason about overlapping intervals.",
        "problems": [
            {"title": "Insert Interval", "difficulty": "medium", "url": "https://leetcode.com/problems/insert-interval/", "order": 1},
            {"title": "Merge Intervals", "difficulty": "medium", "url": "https://leetcode.com/problems/merge-intervals/", "order": 2},
            {"title": "Non-overlapping Intervals", "difficulty": "medium", "url": "https://leetcode.com/problems/non-overlapping-intervals/", "order": 3},
            {"title": "Meeting Rooms", "difficulty": "easy", "url": "https://leetcode.com/problems/meeting-rooms/", "order": 4},
            {"title": "Meeting Rooms II", "difficulty": "medium", "url": "https://leetcode.com/problems/meeting-rooms-ii/", "order": 5},
            {"title": "Minimum Interval to Include Each Query", "difficulty": "hard", "url": "https://leetcode.com/problems/minimum-interval-to-include-each-query/", "order": 6},
        ],
    },
    {
        "name": "Math & Geometry", "slug": "math-geometry", "order_index": 16,
        "description": "Mathematical reasoning, bit manipulation, and geometric problems.",
        "problems": [
            {"title": "Rotate Image", "difficulty": "medium", "url": "https://leetcode.com/problems/rotate-image/", "order": 1},
            {"title": "Spiral Matrix", "difficulty": "medium", "url": "https://leetcode.com/problems/spiral-matrix/", "order": 2},
            {"title": "Set Matrix Zeroes", "difficulty": "medium", "url": "https://leetcode.com/problems/set-matrix-zeroes/", "order": 3},
            {"title": "Happy Number", "difficulty": "easy", "url": "https://leetcode.com/problems/happy-number/", "order": 4},
            {"title": "Plus One", "difficulty": "easy", "url": "https://leetcode.com/problems/plus-one/", "order": 5},
            {"title": "Pow(x, n)", "difficulty": "medium", "url": "https://leetcode.com/problems/powx-n/", "order": 6},
            {"title": "Multiply Strings", "difficulty": "medium", "url": "https://leetcode.com/problems/multiply-strings/", "order": 7},
            {"title": "Detect Squares", "difficulty": "medium", "url": "https://leetcode.com/problems/detect-squares/", "order": 8},
        ],
    },
    {
        "name": "Bit Manipulation", "slug": "bit-manipulation", "order_index": 17,
        "description": "XOR, AND, OR, shifts — powerful tools for space-efficient solutions.",
        "problems": [
            {"title": "Single Number", "difficulty": "easy", "url": "https://leetcode.com/problems/single-number/", "order": 1},
            {"title": "Number of 1 Bits", "difficulty": "easy", "url": "https://leetcode.com/problems/number-of-1-bits/", "order": 2},
            {"title": "Counting Bits", "difficulty": "easy", "url": "https://leetcode.com/problems/counting-bits/", "order": 3},
            {"title": "Reverse Bits", "difficulty": "easy", "url": "https://leetcode.com/problems/reverse-bits/", "order": 4},
            {"title": "Missing Number", "difficulty": "easy", "url": "https://leetcode.com/problems/missing-number/", "order": 5},
            {"title": "Sum of Two Integers", "difficulty": "medium", "url": "https://leetcode.com/problems/sum-of-two-integers/", "order": 6},
            {"title": "Reverse Integer", "difficulty": "medium", "url": "https://leetcode.com/problems/reverse-integer/", "order": 7},
        ],
    },
]


def seed():
    db = SessionLocal()
    try:
        if db.query(models.Topic).count() > 0:
            print("⚠️  Database already seeded. To reseed, delete dsa_tracker.db and run again.")
            return
        print("🌱 Seeding NeetCode 150 problems...")
        total = 0
        for t in ROADMAP:
            topic = models.Topic(name=t["name"], slug=t["slug"], description=t["description"], order_index=t["order_index"])
            db.add(topic)
            db.flush()
            for p in t["problems"]:
                problem = models.Problem(topic_id=topic.id, title=p["title"], difficulty=p["difficulty"], leetcode_url=p["url"], order_index=p["order"])
                db.add(problem)
                total += 1
        db.commit()
        print(f"✅ Seeded {len(ROADMAP)} topics and {total} problems!")
    except Exception as e:
        db.rollback()
        print(f"❌ Failed: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed()