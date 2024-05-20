import mongoose from "mongoose";
import app from "./app";

async function main() {
    await mongoose.connect("mongodb+srv://assignment-2:qj0Wf1Evnx4TgetE@cluster0.auvs2t0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    
    const port=5000;
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
  }

  main()