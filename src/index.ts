import app from "./app";
import connectDB from "./db";

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
