import subprocess

# --- SETTINGS ---
# Change to your GitHub username and repository name
REPO = "joy111119/salad-configurator"

# --- TICKET DATA ---
tickets = [
    {
        "title": "Task 4.1: Hamburger Menu Toggle (Header)",
        "body": "**Goal:** Make the dropdown menu in the Header functional.\n\n**Tech Spec:** In `Header.tsx`, add a local state `const [isMenuOpen, setIsMenuOpen] = useState(false)`. Modify the green menu box so it is hidden by default, and only renders (using `isMenuOpen && (...)` or dynamic CSS classes like `hidden`) when the state is true. Attach the state toggle to the hamburger icon (three lines) button."
    },
    {
        "title": "Task 4.2: Modal component's basic structure",
        "body": "**Goal:** Build the foundation for all future Pop-up windows (wrapper component).\n\n**Tech Spec:** Create `src/components/Modal.tsx`. Give its props types: `isOpen` (boolean), `onClose` (function), and `children` (ReactNode). Add conditional rendering at the very beginning of the component: `if (!isOpen) return null;`."
    },
    {
        "title": "Task 4.3: Modal layout and Background (z-index)",
        "body": "**Goal:** Make the modal look good, cover the screen, and prevent accidental closing.\n\n**Tech Spec:** Continue coding `Modal.tsx`. Give the outermost div the classes `fixed inset-0 bg-black/60 flex items-center justify-center z-50`. Set its `onClick` event to the `onClose` function. Create a white box inside it, and place `{children}` inside the white box. Prevent the white box from closing the modal by setting `onClick={(e) => e.stopPropagation()}` on it. Place a small 'X' close button inside."
    },
    {
        "title": "Task 4.4: Building the LoginModal component",
        "body": "**Goal:** Build a UI form for logging in.\n\n**Tech Spec:** Create `src/components/LoginModal.tsx`. This component uses the `<Modal>` wrapper you just made (import it). Build a `<form>` inside it with input fields for email and password, and a submit button. Bind the inputs to local `useState` variables."
    },
    {
        "title": "Task 4.5: Connecting LoginModal to Header",
        "body": "**Goal:** The user can open the login window from the dropdown menu.\n\n**Tech Spec:** Open `Header.tsx` and create a local state `const [isLoginOpen, setIsLoginOpen] = useState(false)`. Make the 'Kirjaudu sisään' (Log in) button inside your dropdown menu change this state to `true`. Inject the `<LoginModal>` component at the bottom of the Header code and pass the open state and close function to it as props."
    },
    {
        "title": "Task 4.6: Form basic logic (preventDefault)",
        "body": "**Goal:** Ensure the login form doesn't reload the page.\n\n**Tech Spec:** In `LoginModal.tsx`, add a function to the form's `onSubmit` event that first calls `e.preventDefault()`. We won't make a real API call this week, so just put `console.log('Login clicked')` in the function and clear the inputs."
    },
    {
        "title": "Task 4.7: Dynamic Bowl Volume (CenterBowl)",
        "body": "**Goal:** Show the actual volume of the selected bowl under the center graphic.\n\n**Tech Spec:** Ensure `useIngredientStore.ts` tracks `selectedBowl` (type: Bowl | null) and has `setBowl(bowl: Bowl)`. In `BowlSelection.tsx`, call this function when a user clicks a bowl. Finally, in `CenterBowl.tsx`, read the `selectedBowl` from the store and replace the static '500 ml' text with `{selectedBowl ? selectedBowl.volume : 0} ml`."
    },
    {
        "title": "Task 4.8: Action Buttons (Trash can, Undo, Save)",
        "body": "**Goal:** Make the small icons above the center bowl functional or show alerts.\n\n**Tech Spec:** In `CenterBowl.tsx`, locate the three icon buttons. Connect the Trash can (🗑️) to the `clearSelection` function from the store. Add a `window.confirm('Are you sure you want to empty the bowl?')` before clearing it! For the Undo (↩️) and Save (💾) buttons, add a simple `onClick={() => alert('Feature coming soon!')}` for now."
    },
    {
        "title": "Task 4.9: Quantity of selected products to Summary",
        "body": "**Goal:** Update the SummaryBar to show how many ingredients are in the portion.\n\n**Tech Spec:** Open `SummaryBar.tsx`. Ensure you are reading the `slots` variable from `useIngredientStore`. Convert this Record into an array of active ingredients using `Object.values(slots).filter(i => i !== null)`. Display the item count in the specific text pill by reading the `.length` of this new array."
    },
    {
        "title": "Task 4.10: Calculating total weight (.reduce)",
        "body": "**Goal:** Calculate and display the exact total weight of the portion in grams.\n\n**Tech Spec:** Use the `.reduce()` method on your active ingredients array (from Task 4.9) to calculate the sum of the `weight_grams` fields. Print the result in the 'Arvioitu paino' (Estimated weight) pill in the SummaryBar. Remember to set zero `0` as the initial value for the `.reduce()` function!"
    },
    {
        "title": "Task 4.11: Isolate the Math Logic (Boss Level)",
        "body": "**Goal:** Move the weight calculation out of the UI.\n\n**Tech Spec:** Create a folder `src/utils` and a file `calculations.ts`. Write an exported function `calculateTotalWeight(ingredients)` that contains the `.reduce()` logic you built in Task 4.10. Import this function into `SummaryBar.tsx` and use it there instead of calculating it directly in the component."
    },
    {
        "title": "Task 4.12: Write a Unit Test (Boss Level)",
        "body": "**Goal:** Test your new function automatically with Vitest.\n\n**Tech Spec:** Run `npm install -D vitest`. Add `\"test\": \"vitest\"` to your `package.json` scripts. Create `src/utils/calculations.test.ts`. Write a test that feeds a mock array of ingredients (e.g., two ingredients weighing 50g and 100g) into your function and use `expect(result).toBe(150)` to ensure it works! Run `npm run test`."
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
        print(f"❌ Error in task {ticket['title']}: {e.stderr}")

def main():
    print(f"🚀 Importing Sprint 4 tickets to repository: {REPO}\n")
    for t in tickets:
        create_issue(t)
    print("\n🎉 Sprint 4 tickets are now in GitHub!")

if __name__ == "__main__":
    main()