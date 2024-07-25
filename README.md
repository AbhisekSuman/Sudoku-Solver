# Sudoku Solver Mobile Application

## Introduction

This is a mobile application built with Expo React Native that allows users to input initial Sudoku values, validate the entries, and solve the Sudoku puzzle. The application provides features such as a 9x9 grid for input, validation logic, solving algorithm, error messages for invalid entries, and the solved puzzle display.

## Features

1. **9x9 Grid Input**: Users can input initial Sudoku values (1-9) or leave cells blank for unknown values.
2. **Validate Button**: Checks the validity of the current state of inputs.
3. **Solve Button**: Solves the Sudoku puzzle if the entries are valid.
4. **Error Handling**: Displays an error message if the initial entries are invalid.
5. **Solved Puzzle Display**: Shows the solved Sudoku puzzle if it is solvable.
6. **Validation Logic**: Ensures rows, columns, and 3x3 sub-grids contain unique values.
7. **Backtracking Algorithm**: Implements a backtracking algorithm to solve the Sudoku puzzle.
8. **Bottom Drawer**: Includes a bottom drawer for additional features.
9. **Hints**: Provides hints for solving the puzzle.

## Approach

### Validation Logic

The validation logic checks the following conditions:
- Each row must contain unique values from 1 to 9.
- Each column must contain unique values from 1 to 9.
- Each 3x3 sub-grid must contain unique values from 1 to 9.

### Solving Algorithm

The solving algorithm uses a backtracking approach:
1. Find the first empty cell.
2. Try numbers 1 through 9 in the empty cell.
3. Check if the number is valid based on the current board state.
4. If valid, recursively attempt to fill in the next empty cell.
5. If an invalid state is encountered, backtrack and try the next number.
6. Repeat until the board is completely filled or no solution exists.

## Running the Project

### Prerequisites

- Node.js
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/AbhisekSuman/Sudoku-Solver.git
   cd sudoku-solver-app
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Run the application:
   ```sh
   npx expo start
   ```

4. Follow the on-screen instructions to run the app on an Android or iOS emulator, or scan the QR code using the Expo Go app on your physical device.

## Additional Notes

- The application uses Expo React Native for cross-platform compatibility and ease of development.
- The UI components are built using React Native's core components.
- State management is handled using React's useState and useEffect hooks.
- The bottom drawer and hints feature are implemented using third-party libraries.

## Directory Structure

```
sudoku-solver-app/
├── assets/
├── node_modules/
├── .gitignore
├── App.js
├── app.json
├── babel.config.js
├── package.json
├── README.md
└── ...
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, feel free to reach out.

---

Feel free to adjust any sections or add any additional details specific to your implementation.
## Demo

![image](https://github.com/AbhisekSuman/Sudoku-Solver/blob/master/Demo.jpg)

