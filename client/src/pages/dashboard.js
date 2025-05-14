import TaskCard from "../components/task-card";
import { Grid } from "@mui/system";

function Dashboard() {

    let taskcards = [];

    for (var i=0; i<10; i++) {
        taskcards.push( (<TaskCard/>) )
    }

    return (
        <div>
            <div class="dashboard-content">
                <Grid container spacing={2}>
                    { taskcards.map( (item) => (
                        <Grid size={{ xs:12, md:6, lg:4, xl:3 }}>
                            {item}
                        </Grid>
                    ) ) }
                </Grid>
            </div>
            
            <div class="dashboard-header"> Dashboard </div>
            <div class="dashboard-footer"> + Create Task </div>
        </div>
    );

}

export default Dashboard;