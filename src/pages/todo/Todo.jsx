import { Button, Grid, IconButton, TextField } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import axios from "axios";
import { Delete, Autorenew } from "@material-ui/icons";

export default function Todo() {
  const [todo, setTodo] = useState(null);
  const [input, setInput] = useState(``);
  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/todos`,
        );
        setTodo(res.data.slice(0, 10));
      } catch (err) {
        console.log(err.message);
      }
    };
    getApi();
  }, []);

  const handleDelete = (id) => {
    setTodo([...todo].filter((i) => i.id !== id));
  };
  const handleComplete = (data) => {
    setTodo([...todo].map(i => {
        if(i.id === data.id) return {...data, completed: !data.completed}
        return i
    }))
  };

  const transform = () => {
    return todo.map((i) => {
      return [
        i.title,
        i.completed ? `انجام شده` : `انجام نشده`,
        <IconButton onClick={() => handleComplete(i)}>
            <Autorenew />
        </IconButton>,
        <IconButton onClick={() => handleDelete(i.id)}>
          <Delete color="error" />
        </IconButton>,
      ];
    });
  };
  

  const haandleSubmit = (e) => {
    e.preventDefault();
    if (input !== ``) {
      setTodo([{ completed: false, title: input, id: Math.random() }, ...todo]);
    }
    setInput(``);
  };

  return (
    <div>
      <PageTitle title="لیست کارها" />
      <Grid container spacing={4}>
        <form onSubmit={haandleSubmit}>
          <Grid container spacing={4}>
            <Grid item>
              <TextField
                onChange={(e) => setInput(e.target.value)}
                value={input}
                label="کار جدید"
              />
            </Grid>
            <Grid item>
              <Button type="submit" color="primary" variant="contained">
                ثبت
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid item xs={12}>
          {todo && (
            <MUIDataTable
              title="لیست کارها"
              data={transform(todo)}
              columns={["عنوان", "وضعیت", "تغییر وضعیت", "حذف"]}
              options={{ filterType: "checkbox" }}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
