import {Request, Response} from "express";
import {Figure} from "../models/figure";

// const figureRouter = Router();

const TEMP_DB: { [key:string]: Figure } = {
  "figure1": new Figure({
    id: "test", name: "Melina Figure (Elden Ring)",
    image: "image URL", price: 69.99, stock: 100, present: true,
  }),
  "figure2": new Figure({
    name: "Melina Pop Figure (Elden Ring)",
    image: "image URL", price: 39.99, stock: 50, present: true,
  }),
};

export async function getFigures(req: Request, res: Response) {
  const figureId = req.query.figureId?.toString();
  try {
    if (figureId) {
      // TODO: add query to find figure by id
      const figure = TEMP_DB[figureId];
      if (figure) {
        const data = {
          [figureId]: figure,
        };
        res.send(data);
      } else {
        res.status(404).send("Figure not found");
      }
    } else {
      // TODO: add query for all figures
      const figures = TEMP_DB;
      res.send(figures);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

// figureRouter.get("/", [], async function(req: Request, res: Response) {
//   const figureId = req.query.figureId?.toString();
//   try {
//     if (figureId) {
//       // TODO: add query to find figure by id
//       const figure = TEMP_DB[figureId];
//       if (figure) {
//         const data = {
//           [figureId]: figure,
//         };
//         res.send(data);
//       } else {
//         res.status(404).send("Figure not found");
//       }
//     } else {
//       // TODO: add query for all figures
//       const figures = TEMP_DB;
//       res.send(figures);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

export async function postFigure(req: Request, res: Response) {
  // TODO: insert new figure
  const newFigure = new Figure(req.body);
  const figureId = "figure3";
  const data = {
    [figureId]: newFigure,
  };
  res.send(data);
}

// figureRouter.post("/", [], async function(req: Request, res: Response) {
//   // TODO: insert new figure
//   const newFigure = new Figure(req.body);
//   const figureId = "figure3";
//   const data = {
//     [figureId]: newFigure,
//   };
//   res.send(data);
// });

// export default figureRouter;
