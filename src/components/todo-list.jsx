import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Grid2, Paper, Typography, Button, LinearProgress } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteHabit, toggleHabit } from "../features/habit-tracker/habit-slice";

const TodoList = () => {
  const habits = useSelector((state) => state.habits.habits);
  const today = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch();

  const getStreak = (habit) => {
    let streak = 0;
    const currentDate = new Date();

    while(true){
      const dateString = currentDate.toISOString().split("T")[0];

      if(habit.completedDates.includes(dateString)){
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      }
      else{
        break;
      }
    }
    return streak;
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, m: 2 }}>
        {habits.map((habit) => (
          <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
            <Grid2 container alignItems="center">
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Typography variant="h6">{habit.name}</Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  {habit.frequency}
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >
                  <Button
                    variant="outlined"
                    color={
                      habit.completedDates.includes(today)
                        ? "success"
                        : "primary"
                    }
                    startIcon={<CheckCircleIcon />}
                    onClick={() => {
                      dispatch(toggleHabit({ id: habit.id, date: today }));
                    }}
                  >
                    {habit.completedDates.includes(today)
                      ? "Completed"
                      : "Mark Completed"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={()=>{
                      dispatch(deleteHabit({id:habit.id}))
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Grid2>
            </Grid2>
            <Box sx={{mt:2}}>
                <Typography variant="body2" >Current streak: {getStreak(habit)} </Typography>
                <LinearProgress variant="determinate"
                                value={(getStreak(habit)/30)*100}
                                sx={{mt:1}} />
            </Box>
          </Paper>
        ))}
      </Box>
    </>
  );
};

export default TodoList;
