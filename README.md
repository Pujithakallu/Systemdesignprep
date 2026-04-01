# System Design Prep

A personal project where I’m building a structured and practical knowledge base for System Design interview preparation.

Next.js + Nextra for a clean documentation experience  
Tailwind CSS for styling  
MDX for combining content with flexibility  

---------------------------------------------------------------------------

## Running the project
git clone https://github.com/Pujithakallu/Systemdesignprep.git


-->cd Systemdesignprep
--> npm install
--> npm run dev

# Open this URL in your browser
http://localhost:3000

----------------------------------------------------------------------------

## Issues faced while running
# Remove existing dependencies (clean setup)
rm -rf node_modules package-lock.json

# Clear npm cache (fix corrupted cache issues)
rm -rf ~/.npm

# Reinstall dependencies
npm install

# Fix macOS native module restrictions (if on Mac)
xattr -dr com.apple.quarantine node_modules

# Run the project again
npm run dev
