# React Artwork Data Table

A React application featuring a data table that displays artwork data from the Art Institute of Chicago API with server-side pagination and persistent row selection.

## 🚀 Live Demo

[View Deployed Application](https://taupe-twilight-6bcc12.netlify.app/) 

## ✨ Features

- **Data Table**: Displays artwork data using PrimeReact DataTable component
- **Server-Side Pagination**: Fetches data per page from the API (not all at once)
- **Row Selection**: Checkboxes for selecting/deselecting individual rows
- **Select All**: Select/deselect all rows on the current page
- **Custom Selection Panel**: Overlay panel to select N number of rows via input field
- **Persistent Selection**: Selected rows persist when navigating between pages

## 📋 Data Fields Displayed

| Field | Description |
|-------|-------------|
| `title` | Artwork title |
| `place_of_origin` | Origin location |
| `artist_display` | Artist information |
| `inscriptions` | Artwork inscriptions |
| `date_start` | Start date |
| `date_end` | End date |

## 🛠️ Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **PrimeReact** - UI component library (DataTable)

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SagarKharat94440/GrowMeOrganic-Private-Limited.git
   cd React-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.


## 🔌 API Reference

**Endpoint**: `https://api.artic.edu/api/v1/artworks?page={pageNumber}`

The API returns paginated artwork data from the Art Institute of Chicago.

## 💡 Implementation Notes

### Persistent Selection Strategy

- Selections are tracked using row IDs, not entire row objects
- Only current page data is stored in state
- Selection state persists across page navigation without pre-fetching other pages
- When returning to a previously visited page, selections are restored from the tracked IDs

### Key Principles

- ✅ Only stores current page data
- ✅ Always fetches from API when changing pages
- ✅ Tracks selections separately using row IDs
- ❌ Does NOT pre-fetch multiple pages for bulk selection
- ❌ Does NOT store row objects from other pages


## 📄 License

This project is created as part of a React internship assignment.
