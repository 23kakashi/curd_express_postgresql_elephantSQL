import express, { Application, Request, Response } from "express";
import cors from "cors";
import { client } from "./pg";

const app: Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (request: Request, response: Response) => {
  try {
    let data = await client.query(`SELECT * FROM person LIMIT 10`);
    response.status(200).json({
      message: "success",
      error: false,
      data: data.rows,
    });
  } catch (error) {
    response.status(500).json({
      error: true,
      message: "Something went wrong",
    });
  }
});

app.post("/", async (request: Request, response: Response) => {
  try {
    // console.log(request.body);
    const {
      first_name,
      last_name,
      email,
      gender,
      date_of_birth,
      country_of_birth,
    } = request.body;

    const insertQuery: String = `INSERT INTO person (first_name, last_name, email, gender, date_of_birth,  country_of_birth) VALUES ('${first_name}', '${last_name}', '${email}', '${gender}', '${date_of_birth}', '${country_of_birth}')`;

    await client.query(insertQuery);
    response.status(200).json({
      error: false,
      message: "Person created successfully",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      error: true,
      message: "Something went wrong",
    });
  }
});

app.delete("/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    await client.query(`DELETE FROM person WHERE id='${id}'`);
    response.status(200).json({
      message: "Person delete successfully",
      error: false,
    });
  } catch (error) {
    response.status(500).json({
      error: true,
      message: "Something went wrong",
    });
  }
});

app.patch("/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { last_name, gender, country_of_birth } = request.body;

    const updateQuery: String = `UPDATE person SET last_name='${last_name}', gender='${gender}', country_of_birth='${country_of_birth}' WHERE id='${id}'`;

    await client.query(updateQuery);
    response.status(200).json({
      error: false,
      message: "person updated successfully",
    });
  } catch (error) {
    response.status(500).json({
      error: true,
      message: "Something went wrong",
    });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await client.connect();
    console.log(`Listening on Port 8080`);
  } catch (error) {
    console.log(error);
  }
});
