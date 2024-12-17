# Notes App

A simple, full-stack **Notes Management App** built with **React**, allowing users to create, edit, delete, and toggle favorite notes. Users can register, log in, and manage their notes securely. The app interacts with an external API to persist the data, and features a pleasant UI to manage your notes efficiently.

## Features

- **User Authentication**: Users can register, log in, and log out to manage their personal notes.
- **Note Management**: Users can create, edit, delete, and toggle the importance of their notes.
- **Favorites Toggle**: Filter and view favorite (important) notes separately from all notes.
- **Responsive UI**: User-friendly UI to navigate between the application’s features, including a responsive form for creating new notes.
- **Dynamic Note Editing**: Users can edit any note in place or cancel edits.

## Technologies Used

- **React**: Frontend framework for building the UI components.
- **React Router**: For handling the routing between the pages.
- **Local Storage**: For storing the user session information securely in the browser.
- **Axios**: For interacting with the external API to manage notes.
- **CSS**: Custom styles for UI components.

## Installation and Setup

1. **Clone this repository** to your local machine:
    ```bash
    git clone <repository-url>
    ```

2. **Navigate into the project folder**:
    ```bash
    cd <project-folder>
    ```

3. **Install the dependencies**:
    ```bash
    npm install
    ```

4. **Run the development server**:
    ```bash
    npm start
    ```

5. Open your browser and go to `http://localhost:3000` to view the app.

## Folder Structure

- **src/components/**: Contains React components for the application such as `Note`, `LoginForm`, `RegisterForm`.
- **src/services/**: Includes services to interact with the backend API, such as `noteService` for managing notes and `loginService` for user authentication.
- **src/App.js**: Main component managing the UI, authentication, and note management logic.

## Usage

- **Register**: New users can create an account by providing their username, email, and password.
- **Login**: Registered users can log in with their credentials.
- **Manage Notes**: Once logged in, users can:
    - **Add new notes** by typing into the input field and clicking the "Save" button.
    - **Toggle the importance** of a note, marking it as a favorite (important) or removing it.
    - **Edit existing notes** by clicking the pencil icon, making changes, and saving.
    - **Delete notes** with the trash icon.
    - **Filter notes** to view only important notes.
- **Logout**: Users can log out, which removes their session from local storage.

## Screenshots

Here you can add any relevant screenshots or screen recordings of your app.

---

## Future Improvements

- **Error Handling**: Display more detailed error messages when a user encounters an issue.
- **User Profiles**: Add user profile features where users can update their personal information.
- **UI Enhancements**: Improve the app's interface for a smoother user experience.
- **Note Search**: Allow users to search for notes based on content or keywords.
- **Backend**: Implement a backend API (e.g., with Node.js and Express) to fully manage authentication and notes.

## Contributing

If you'd like to contribute to the development of this app, feel free to fork the repository and submit a pull request. Any contributions are welcome!

## License

This project is licensed under the MIT License.
