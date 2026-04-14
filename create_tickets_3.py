import subprocess

# --- SETTINGS ---
# Change to your GitHub username and repository name
REPO = "joy111119/salad-configurator"

# --- TICKET DATA ---
tickets = [
    {
        "title": "Task 3.1: Install Zustand and Create Store",
        "body": "**Goal:** Create a global store to manage the selected ingredients using a slot-based architecture.\n\n**Tech Spec:** Run `npm install zustand`. Create `src/store/useIngredientStore.ts`. Define the interface with `slots: Record<string, Ingredient | null>`, `baseType: number` (default 1), and `selectedBowl: Bowl | null`. Add basic setter functions `setBaseType(id)`, `setBowl(bowl)`, `clearSelection()`, and empty placeholders for `addIngredient(item)` and `removeIngredient(id)`."
    },
    {
        "title": "Task 3.2: Base Type & Bowl Selection Logic",
        "body": "**Goal:** Filter bowls and categories based on the base type and select a bowl.\n\n**Tech Spec:** In `Configurator.tsx`, read `baseType` from the store. Filter `bowls` and `categories` arrays so they only show items where `base_type_id` matches. In `CenterBowl.tsx`, connect the 'Salaatti' and 'Rahka' buttons to `setBaseType`. In `BowlSelection.tsx`, connect the bowl buttons to `setBowl`."
    },
    {
        "title": "Task 3.3: Connect IngredientCard to Store",
        "body": "**Goal:** Allow users to trigger adding items by clicking the cards.\n\n**Tech Spec:** In `IngredientCard.tsx`, import `useIngredientStore`. Add an `onClick` handler to the card's main button that triggers `addIngredient(ingredient)`."
    },
    {
        "title": "Task 3.4: Category Filtering Logic",
        "body": "**Goal:** Make the category buttons functional.\n\n**Tech Spec:** In `IngredientSection.tsx`, add a local state `activeCategory` (default 'all'). When a category button is clicked, update this state. Filter the `ingredients` array based on the active category before mapping it to the UI grid."
    },
    {
        "title": "Task 3.5: Search Bar Implementation",
        "body": "**Goal:** Allow users to search for ingredients by name.\n\n**Tech Spec:** In `IngredientSection.tsx`, add a local state for `searchQuery`. Update your derived `filteredIngredients` logic to also check if `ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())`."
    },
    {
        "title": "Task 3.6: Smart Addition Logic (Slots)",
        "body": "**Goal:** Implement the logic to place ingredients into specific slots in the bowl.\n\n**Tech Spec:** In `useIngredientStore.ts`, complete `addIngredient(item)`. If `item.categoryId === 6`, set it to `slots: { ...state.slots, \"base\": item }`. Otherwise, check `state.selectedBowl?.slot_count`. Loop from 1 to `slot_count` to find the first empty slot key (e.g. `slot-1`). If found, add the item to that key in the `slots` record."
    },
    {
        "title": "Task 3.7: Item Removal Logic",
        "body": "**Goal:** Implement the logic to remove an ingredient from the slots.\n\n**Tech Spec:** In `useIngredientStore.ts`, complete `removeIngredient(id)`. Copy the current `slots` object. Use `Object.keys(newSlots).find(...)` to find the FIRST key where the item's id matches the given id. Set that key to `null` and update the state."
    },
    {
        "title": "Task 3.8: Visualize Bowl Content",
        "body": "**Goal:** Show the selected items in the center graphic.\n\n**Tech Spec:** In `CenterBowl.tsx`, read the `slots` state. Convert it to an array of active ingredients using `Object.values(slots).filter(i => i !== null)`. Map over this array and display the names of selected ingredients as 'pills' inside the visual bowl."
    },
    {
        "title": "Task 3.9: Dynamic SummaryBar Totals & Removal",
        "body": "**Goal:** Update the bottom bar and allow item removal directly from it.\n\n**Tech Spec:** In `SummaryBar.tsx`, read `slots` and convert it to an array of active ingredients. Display the `.length` for the item count. Map over the active ingredients to show the chosen items. Add a small 'x' button to each mapped item connecting to `removeIngredient(item.id)`."
    }
]

def create_issue(ticket):
    cmd = [
        "gh", "issue", "create",
        "--repo", REPO,
        "--title", ticket["title"],
        "--body", ticket["body"]
    ]
    try:
        subprocess.run(cmd, capture_output=True, text=True, check=True)
        print(f"✅ Created: {ticket['title']}")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error: {e.stderr}")

def main():
    print(f"🚀 Importing Sprint 3 tickets to: {REPO}\n")
    for t in tickets:
        create_issue(t)
    print("\n🎉 Sprint 3 tickets are live!")

if __name__ == "__main__":
    main()