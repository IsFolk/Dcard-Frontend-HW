# Dcard-Frontend HW 2024 Yu-Ting Tseng

This project is a TypeScript/Next.js web application with a blog feature and various components.

You can find my online demo here:

https://dcard-frontend-hw.vercel.app/


## Before started

Make sure to create Github OAuth App and set the URL and callback URL

- Homepage URL: http://localhost:3000/
- Authorization callback URL: http://localhost:3000/api/auth/callback/github

You will get GITHUB_SECRET and GITHUB_ID

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Configure your own .env.local file
```.env.local
NEXTAUTH_SECRET= YOUR_NEXT_AUTH_SECRET
GITHUB_SECRET = YOUR_GITHUB_SECRET
GITHUB_ID= YOUR_GITHUB_ID
GITHUB_TOKEN= YOUR_GITHUB_TOKEN
GITHUB_OWNER=YOUR_GITHUB_NAME
GITHUB_REPO=YOUR_GITHUB_REPO
NEXT_PUBLIC_GITHUB_OWNER=YOUR_GITHUB_NAME
NEXT_PUBLIC_GITHUB_REPO=YOUR_GITHUB_REPO
```

3. Start the development server: `npm run dev` or `yarn dev`
4. Open `http://localhost:3000` in your browser

## Project Structure


- `src/app`: Next.js root directory for pages and layouts
- `src/api`: API routes and authentication logic (I tried too be clean but maybe not clean enough, some api calls still outside)
- `src/blog`: Blog-related components and pages
    - page.tsx: Default page, loading all blog components
    - issueList.tsx: For issues fetching (GET)
    - issues_unit: For rendering issues
    - spinner.tsx: Spinner when loading more issues
    - types.tsx: Interfaces that are commonly used
- `src/api-components`: Reusable API components (e.g., SignIn, SignOut)
    - SignInButton.tsx: Sign-in button for github OAuth
    - SignOutButton.tsx: Sign-out button for githup OAuth (I didn't use it later becuz I used NEXTUI's component)
- `src/blog/blog-components`: Reusable blog components (navbar)\
    - navbar.tsx : Navbar on the top side, including sign-in button & sign-out button
- `src/blog/buttons`: Reusable blog components (they are called buttons but most of them are function-based)

    **For Repo Owner:**
    - closeButton.tsx: Setting the issue set to close (after setting we should not see the issue again)
    - createbutton.tsx: Creating new issue, you can type title and body, there are title and length controls for it
    - updateButton.tsx: Updating the issue, you can type title and body, there are title and length controls for it
    
    **For Public User & Repo Owner:**
    - viewButton.tsx: to view the issue

### Configuration

- `next.config.js`: Next.js configuration file
- `.env.local`: Environment variables (e.g., API keys)

### Other Files

- `package.json`: Project dependencies and scripts

## Deployment

To deploy the application, you can use a hosting service like Vercel or Netlify, or set up a server and build the project with `npm run build` or `yarn build`.


## Other things (Bugs or Murmurs(?))

### 目前Bug但有點無解:
1. 在get issues的時候就算重新送request也會得到一樣的結果，所以可能沒辦法直接看到頁面渲染QQ (通常要等一陣子或是通靈的時候才會突然變，但我在POSTMAN測的時候GET是會不一樣的)
試過
- 送random參數起初有效果但不知道為什麼又沒效了　（感覺跟Github API應該無關但是）
- headers裡面要求不要Cache，但我試著去用Chrome的無痕模式還是一樣的結果，所以跟Cache的關係應該也不大
- 有發現如果把一次fetch的issue數減少的話好像可以解決這個問題 (但作業要求是10所以我還是設定10)

**但是可以確定repo內容都是有更新的**

### 感覺可以再修正的地方
1. ~~為了作業方便把repo都寫死了，所以目前編輯和刪除也只有repo的owner可以而已(目前應該是只有我的Github帳號可以做這些事)，感覺可以多一些設置的選項~~ -> 已改成可用環境變數設定
2. 取名不統一...要改進QQ


最後為了Demo還會再錄一些影片證明是真的有做出來(?)
