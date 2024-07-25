import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Provider as PaperProvider, FAB } from 'react-native-paper';

// const initialGrid = Array.from({ length: 9 }, () => Array(9).fill(''));


const App = () => {
  const initialGrid = [
    ['', '', '', '', '', '', '', '', '',],
    ['4', '', '', '', '', '', '', '', '',],
    ['', '', '', '', '', '', '', '3', '',],
    ['', '', '', '', '6', '', '', '', '',],
    ['', '', '', '8', '', '', '', '', '',],
    ['', '', '', '', '', '', '', '', '',],
    ['', '', '', '', '', '', '', '', '',],
    ['', '', '', '', '', '', '', '', '',],
    ['', '', '', '', '', '', '', '2', '',],
  ];

  const [grid, setGrid] = useState(initialGrid);
  const [initialValues, setInitialValues] = useState(initialGrid);
  const [message, setMessage] = useState(null);
  const [solved, setSolved] = useState(null);
  const [hintCount, setHintCount] = useState(5); // Track remaining hints

  const handleInputChange = (value, row, col) => {
    const updatedGrid = grid.map((r, rowIndex) =>
      r.map((c, colIndex) => (rowIndex === row && colIndex === col ? value : c))
    );
    setGrid(updatedGrid);
  };

  const handleInitialInputChange = (value, row, col) => {
    const updatedInitialGrid = initialValues.map((r, rowIndex) =>
      r.map((c, colIndex) => (rowIndex === row && colIndex === col ? value : c))
    );
    setInitialValues(updatedInitialGrid);
    handleInputChange(value, row, col);
  };

  const validateGrid = () => {
    for (let i = 0; i < 9; i++) {
      const rowSet = new Set();
      const colSet = new Set();
      const subGridSet = new Set();

      for (let j = 0; j < 9; j++) {
        if (grid[i][j] !== '') {
          if (rowSet.has(grid[i][j])) return false;
          rowSet.add(grid[i][j]);
        }
        if (grid[j][i] !== '') {
          if (colSet.has(grid[j][i])) return false;
          colSet.add(grid[j][i]);
        }

        const subRow = 3 * Math.floor(i / 3) + Math.floor(j / 3);
        const subCol = 3 * (i % 3) + (j % 3);
        if (grid[subRow][subCol] !== '') {
          if (subGridSet.has(grid[subRow][subCol])) return false;
          subGridSet.add(grid[subRow][subCol]);
        }
      }
    }
    return true;
  };

  const solveSudoku = () => {

    if (validateGrid()) {
      const solved = solve(grid);
      if (solved) {
        setSolved(solved);
      } else {
        Alert.alert('Error', 'Sudoku puzzle is not solvable.');
      }
    } else {
      Alert.alert('Error', 'Invalid Sudoku entries.');
    }
  };

  const provideHint = () => {
    if (hintCount <= 0) {
      Alert.alert('No more hints', 'You have used all your hints.');
      return;
    }

    const emptySpot = findEmpty();
    if (!emptySpot) return;
    const [row, col] = emptySpot;
    for (let num = 1; num <= 9; num++) {
      if (isSafe(grid, row, col, String(num))) {
        handleInputChange(String(num), row, col);
        setHintCount(hintCount - 1);
        return;
      }
    }
  };

  const resetGrid = () => {
    setGrid(initialGrid);
    setInitialValues(initialGrid);
    setHintCount(5);
    setSolved(null);
  };

  const findEmpty = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === '') return [row, col];
      }
    }
    return null;
  };

  const isSafe = (grid, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num || grid[x][col] === num) return false;
      const subRow = 3 * Math.floor(row / 3) + Math.floor(x / 3);
      const subCol = 3 * Math.floor(col / 3) + (x % 3);
      if (grid[subRow][subCol] === num) return false;
    }
    return true;
  };

  const solve = (grid) => {
    const emptySpot = findEmpty();
    if (!emptySpot) return grid;
    const [row, col] = emptySpot;
    for (let num = 1; num <= 9; num++) {
      if (isSafe(grid, row, col, String(num))) {
        grid[row][col] = String(num);
        if (solve(grid)) return grid;
        grid[row][col] = '';
      }
    }
    return null;
  };


  const validation = () => {
    for (let i = 0; i < 9; i++) {
      const rowSet = new Set();
      const colSet = new Set();
      const subGridSet = new Set();

      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === '') {
          Alert.alert('Error', 'All fields must be filled.');
          return;
        }
        if (grid[i][j] !== '') {
          if (rowSet.has(grid[i][j])) {
            setSolved(false);
            setMessage('Invalid', 'Ooo! Sudoku grid is not valid.');
            return false;
          }
          rowSet.add(grid[i][j]);
        }
        if (grid[j][i] !== '') {
          if (colSet.has(grid[j][i])) {
            setSolved(false);
            setMessage('Invalid' + 'Ooo! Sudoku grid is not valid.');
            return false;
          }
          colSet.add(grid[j][i]);
        }

        const subRow = 3 * Math.floor(i / 3) + Math.floor(j / 3);
        const subCol = 3 * (i % 3) + (j % 3);
        if (grid[subRow][subCol] !== '') {
          if (subGridSet.has(grid[subRow][subCol])) {
            setSolved(false);
            setMessage('Invalid' + 'Ooo! Sudoku grid is not valid.');
            return false;
          }
          subGridSet.add(grid[subRow][subCol]);
        }
      }
    }
    setSolved(true);
    setMessage('Wow..' + 'You are doing Great');
    return true;
  };
  return (
    <PaperProvider>

      <SafeAreaView>
        <StatusBar barStyle='light-content' />
        <View style={styles.top}>
          <Text style={styles.title}>SUDOKU SOLVER</Text>
          <MaterialCommunityIcons onPress={provideHint} name="lightbulb-on-outline" size={30} color="black" />
        </View>

        <View style={styles.container}>
          {solved &&
            <View>
              {solved ?
                <Text style={{ color: 'green' }}>
                  {message}
                </Text>
                :
                <Text style={{ color: 'red' }}>
                  {message}
                </Text>
              }
            </View>
          }

          <View style={styles.grid}>
            {grid.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((value, colIndex) => (
                  <TextInput
                    key={colIndex}
                    style={styles.cell}
                    keyboardType="numeric"
                    maxLength={1}
                    value={value}
                    editable={!initialValues[rowIndex][colIndex]}
                    onChangeText={(text) => handleInitialInputChange(text, rowIndex, colIndex)}
                  />
                ))}
              </View>
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={validation} style={styles.button}>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Validate</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={solveSudoku} style={styles.button}>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Solve</Text>
            </TouchableOpacity >
          </View>
          <FAB
            style={styles.fab}
            icon="reload"
            onPress={resetGrid}
          />

        </View>

      </SafeAreaView>
    </PaperProvider>

  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%'
  },
  top: {
    width: '100%', display: 'flex', height: '8%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 5
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
  },
  button: {
    height: 'fit-content',
    width: 180,
    padding: 10,
    fontSize: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default App;
