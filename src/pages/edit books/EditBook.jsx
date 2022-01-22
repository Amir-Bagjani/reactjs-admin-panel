import PageTitle from "../../components/PageTitle/PageTitle";
import { useLocation, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { useState } from "react";

export default function EditBook() {
  const location = useLocation();
  const history = useHistory();
  const [book, setBook] = useState(null);

  useEffect(() => {
    setBook(location.state);
  }, [location]);

  const handleChange = (key, e) => {
    switch (key) {
      case "name":
        setBook({ ...book, name: e.target.value });
        break;
      case "price":
        setBook({ ...book, price: e.target.value });
        break;
      case "publisher":
        setBook({ ...book, publisher: e.target.value });
        break;
      case "author":
        setBook({ ...book, author: e.target.value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`successfull`);
  };

  return (
    <>
      <PageTitle title="ویرایش اطلاعات کتاب" />
      {book && (
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="center" spacing={2} direction="column">
            <Grid item>
              <TextField
                variant="outlined"
                value={book.name}
                label="نام کتاب"
                onChange={(e) => handleChange("name", e)}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                value={book.price}
                type="number"
                label="قیمت"
                onChange={(e) => handleChange("price", e)}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                value={book.publisher}
                label="ناشر"
                onChange={(e) => handleChange("publisher", e)}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                value={book.author}
                label="نویسنده"
                onChange={(e) => handleChange("author", e)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                style={{ marginLeft: 20 }}
              >
                ویرایش
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.go(-1)}
              >
                لغو
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
}
