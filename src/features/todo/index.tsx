"use client"

import { Button, Container, List } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import AddTodoDialog from './components/AddTodoDialog';
import TodoItem from './components/TodoItem';
import { Todo } from './types';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
    // 他のカラーカスタマイズ
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    // 他のフォントスタイルカスタマイズ
  },
  // 他のテーマカスタマイズ
});

export default function TodoList() {
  const [openDialog, setOpenDialog] = useState(false);
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  // LocalStorageのキー
  const localStorageKey = 'todos';

  // LocalStorageからタスクを読み込む関数
  useEffect(() => {
    const storedTodos = localStorage.getItem(localStorageKey);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // タスクが更新されるたびにLocalStorageに保存
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  }, [todos]);

  const handleOpenDialog = () => {
    setText(''); // ダイアログを開くたびにテキストをリセット
    setDeadline(null); // ダイアログを開くたびに期限をリセット
    setOpenDialog(true);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  const handleSaveTodo = () => {
    const newTodo: Todo = { id: Date.now(), text, completed: false, deadline };
    setTodos(todos.concat(newTodo));
    handleCloseDialog(); // 保存後にダイアログを閉じる
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">

        <Button variant="contained" color="primary" onClick={handleOpenDialog}>Add Todo</Button>
        <AddTodoDialog
          open={openDialog}
          onClose={handleCloseDialog}
          text={text}
          setText={setText}
          deadline={deadline}
          setDeadline={setDeadline}
          handleSave={handleSaveTodo}
        />
        <List>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
          ))}
        </List>
      </Container>
    </ThemeProvider>
  );
}