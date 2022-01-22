import PageTitle from "../../components/PageTitle/PageTitle";
import MUIDataTable from "mui-datatables";
import { Grid, IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const books = [
  {
    id: 1,
    name: "کتاب اول",
    price: 20000,
    publisher: "ناشر یک",
    author: "شجاعی",
  },
  {
    id: 2,
    name: "کتاب دوم",
    price: 35000,
    publisher: "ناشر دو",
    author: "علی ضمیر",
  },
  {
    id: 3,
    name: "کتاب سوم",
    price: 48579,
    publisher: "ناشر یک",
    author: "ضمیر علی",
  },
  {
    id: 5,
    name: "کتاب چهارم",
    price: 10000,
    publisher: "ناشر سه",
    author: "میر آفتاب",
  },
  {
    id: 6,
    name: "کتاب چهارم",
    price: 10000,
    publisher: "ناشر سه",
    author: "میر آفتاب",
  },
  {
    id: 7,
    name: "کتاب چهارم",
    price: 10000,
    publisher: "ناشر سه",
    author: "میر آفتاب",
  },
  {
    id: 8,
    name: "کتاب چهارم",
    price: 10000,
    publisher: "ناشر سه",
    author: "میر آفتاب",
  },
  {
    id: 9,
    name: "کتاب چهارم",
    price: 10000,
    publisher: "ناشر سه",
    author: "میر آفتاب",
  },
];

export default function BookPage() {
  const history = useHistory();
  const [data, setData] = useState([])

  const handleDelete = (id) => {
    setData([...data].filter(i => i.id !== id))
  }
  const handleEdit = (i) => {
    history.push({
      pathname: `/app/book/edit/${i.name}`,
      state: i
    })
  }

  

  const transform = (data) => {
    return data.map((i) => {
      return [
        i.name,
        i.price,
        i.publisher,
        i.author,
        <IconButton onClick={()=>handleDelete(i.id)}>
          <Delete color="error" />
        </IconButton>,
        <IconButton onClick={()=>handleEdit(i)}>
          <Edit />
        </IconButton>,
      ];
    });
  };

 

  useEffect(() => {
    setData(books)
  }, [])

  return (
    <div>
      <PageTitle title="لیست کتابها" />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="کتاب ها"
            data={transform(data)}
            columns={["نام کتاب", "قیمت", "ناشر", "نویسنده", "حذف", "ویرایش"]}
            options={{ filterType: "checkbox" }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
