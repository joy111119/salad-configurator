import subprocess

# --- SETTINGS ---
# Change to your GitHub username and repository name in the format "username/repo"
REPO = "joy111119/salad-configurator"

# --- TICKET DATA ---
tickets = [
    {
        "title": "Task 1.1: Type definitions (BaseType and Bowl)",
        "body": "**Goal:** Start creating the `types.ts` file and learn inheritance (`extends`).\n\n**Tech Spec:** Create a folder `src/types` and a file `index.ts` inside it. Write and export the following interfaces:\n* `BaseType`: fields `id` (number), `name` (string), and optional `price` (number), `image_url` (string), `barcode_url` (string).\n* `Bowl`: inherits (`extends`) `BaseType` and adds optional `base_type_id` (number), optional `volume` (number), `slot_count` (number), and `shape` ('round' | 'square').\n\n**Finally, commit the code with a clear message!**"
    },
    {
        "title": "Task 1.2: Type definitions (Category and Ingredient)",
        "body": "**Goal:** Continue the types file. Make sure you have the latest code from the main branch!\n\n**Tech Spec:** Add the following interfaces to `src/types/index.ts`:\n* `Category`: fields `id` (number), `name` (string), and optional `base_type_id` (number).\n* `Ingredient`: inherits (`extends`) `BaseType` and adds `categoryId` (number), `diets` (string array), and optional `weight_grams` (number).\n\n**Finally, commit the code with a clear message!**"
    },
    {
        "title": "Task 1.3: Type definitions (User and Recipe)",
        "body": "**Goal:** Continue with the types file.\n\n**Tech Spec:** Add the following interfaces to `src/types/index.ts`:\n* `User`: fields `id` (number), `email` (string), and optional `name` (string), `role` (string).\n* `Recipe`: fields `id` (number), `userId` (number), `name` (string), `bowlId` (number), `ingredientIds` (number array), and optional `slots` (Record mapping string keys to Ingredient or null), optional `is_public` (boolean).\n\n**Finally, commit the code with a clear message!**"
    },
    {
        "title": "Task 1.4: Type definitions (PriceListItem)",
        "body": "**Goal:** Finalize the types file.\n\n**Tech Spec:** Add the following interface to `src/types/index.ts`:\n* `PriceListItem`: fields `id` (number), `item_id` (number), `price` (number), and optional `type` (string).\n\n**Finally, commit the code with a clear message!**"
    },
    {
        "title": "Task 1.5: Top Bar (Header)",
        "body": "**Goal:** Build the dark top bar for the application.\n\n**Tech Spec:** Create `src/components/Header.tsx`.\n* Outermost wrapper: `bg-zinc-800 text-white w-full h-32 flex justify-between items-start px-8 pt-4`\n* Left logo (Link): `w-24 h-24 rounded-full border-4 border-[#A2D135] flex items-center justify-center flex-col -mt-2 bg-zinc-800 shadow-lg`. Inside, add texts 'Fresh Food Factory' and 'FRESSE'.\n* Center (h1): `text-3xl font-black tracking-widest mt-6` ('BOWL-LASKURI')\n* Right menu (div): `bg-[#A2D135] text-black rounded-b-3xl rounded-t-xl px-6 py-4 flex flex-col gap-2 min-w-[200px] shadow-md`.\n\n**Finally, commit the code with a clear message!**"
    },
    {
        "title": "Task 1.6: Footer",
        "body": "**Goal:** Create the green footer at the bottom of the page.\n\n**Tech Spec:** Create `src/components/Footer.tsx`.\n* Outermost wrapper: `bg-[#A2D135] text-black p-8 mt-12 w-full flex flex-wrap justify-around items-start`\n* Divide into three columns (divs) with dummy text for Contact, Social Media, and Branding.\n\n**Finally, commit the code with a clear message!**"
    },
    {
        "title": "Task 1.7: Main Layout (App.tsx)",
        "body": "**Goal:** Bring Header and Footer into view and create the main content area.\n\n**Tech Spec:** Go to the `App.tsx` file.\n* Outermost div: `min-h-screen flex flex-col bg-white font-sans`\n* Bring `<Header />` to the top.\n* Below it, a `<main>` area: `flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4`\n* Bring `<Footer />` to the bottom.\n\n**Finally, commit the code with a clear message!**"
    },
    {
        "title": "Task 1.8: Select Bowl (Left Panel Shell)",
        "body": "**Goal:** Build the left box '1. Valitse rasia' from the design.\n\n**Tech Spec:** Create `src/components/BowlSelection.tsx`.\n* Outermost wrapper: `bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg`\n* Circle number '1': `bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0`\n* Create a couple of empty placeholder rows for bowls inside it (e.g., div with classes `h-12 border-2 border-gray-600 rounded-xl flex items-center px-4`).\n\n**Finally, commit the code with a clear message!**"
    },
    {
        "title": "Task 1.9: Select Base (Right Panel Shell)",
        "body": "**Goal:** Build the right box '2. Valitse salaattipohja' from the design.\n\n**Tech Spec:** Create `src/components/BaseSelection.tsx`.\n* Outermost wrapper: `bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg`\n* Circle number '2' like in bowls.\n* Placeholder rows: `border-b border-gray-600 pb-2 flex justify-end gap-4 items-center`.\n\n**Finally, commit the code with a clear message!**"
    },
    {
        "title": "Task 1.10: Center Graphic (Bowl Visual)",
        "body": "**Goal:** Build the large bowl in the center of the screen.\n\n**Tech Spec:** Create `src/components/CenterBowl.tsx`.\n* Outermost wrapper: `flex-1 flex flex-col items-center justify-center min-h-[400px] mt-4 lg:mt-0`\n* Button row on top: `flex gap-3 mb-6 items-center`. (Salaatti, Rahka, Icons).\n* Big Bowl: `w-80 h-80 rounded-full border-[12px] border-gray-200 bg-gray-50 flex items-center justify-center shadow-inner relative`.\n* Bottom info: A div below the bowl containing texts '100 g / 1,99 €' and '500 ml'.\n\n**Finally, commit the code with a clear message!**"
    },
    {
        "title": "Task 1.11: Ingredient Panel (IngredientSection Shell)",
        "body": "**Goal:** Build the visual container for the '3. Lisää raaka-aineet' area.\n\n**Tech Spec:** Create `src/components/IngredientSection.tsx`.\n* Outermost wrapper: `bg-zinc-800 rounded-[3rem] p-8 text-white w-full shadow-lg`\n* Search field: `rounded-full px-6 py-3 text-black outline-none w-64 border-2 border-transparent focus:border-[#A2D135]`\n* Category pill placeholders: `bg-[#A2D135] text-black font-bold px-6 py-2 rounded-full`.\n\n**Finally, commit the code with a clear message!**"
    },
    {
        "title": "Task 1.12: Summary Bar UI (SummaryBar)",
        "body": "**Goal:** Build the large dark summary box from the design.\n\n**Tech Spec:** Create `src/components/SummaryBar.tsx`.\n* Outermost wrapper: `bg-zinc-800 rounded-[3rem] p-8 text-white w-full flex flex-col md:flex-row gap-8 shadow-xl`\n* Left 'Selected ingredients': `flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner`\n* Right side (Totals): `flex-1 flex flex-col justify-center items-center gap-6`. Use classes `bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center` for the weight and price pills.\n\n**Finally, commit the code with a clear message!**"
    },
    {
        "title": "Task 1.13: Assemble parts in App.tsx",
        "body": "**Goal:** Layout all components in the main application file.\n\n**Tech Spec:** Go to the `App.tsx` file. Inside the `<main>` tag:\n1. Create a container: `<div className=\"flex flex-col lg:flex-row gap-6 justify-between items-stretch\">`\n2. Render components in order: `<BowlSelection />`, `<CenterBowl />`, `<BaseSelection />`.\n3. Render `<IngredientSection />` below that row.\n4. Render `<SummaryBar />` at the bottom.\n\n**Finally, commit the code with a clear message!**"
    }

]

def create_issue(ticket):
    """Creates a single issue in GitHub via CLI without labels."""
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
    print(f"🚀 Starting ticket import to repository: {REPO}\n")
    
    # Check if gh-cli is installed
    try:
        subprocess.run(["gh", "--version"], check=True, capture_output=True)
    except:
        print("❌ Error: GitHub CLI (gh) is not installed or not in PATH.")
        return

    for t in tickets:
        create_issue(t)

    print("\n🎉 All tickets processed! Now go to GitHub and add these to your Project board.")

if __name__ == "__main__":
    main()