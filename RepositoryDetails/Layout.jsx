import {Grid, Link, Typography} from "@material-ui/core";
import {Helmet} from "react-helmet";
import {Link as RouterLink} from "react-router-dom";
import {Breadcrumbs, Divider, Paper} from "../Components";
import RepositoryInfo from "./RepositoryInfo";
import SupersetChart from "../components/superset/SupersetChart";
import SkeletonLoading from "./SkeletonLoading";

const Layout = ({repository, selectedProject, reloadRepository, chartUrl}) => {
    if (!repository) return <SkeletonLoading />;
    return (
        <>
            <Helmet title={`Repository: ${repository.name}`} />
            <Typography variant="h3" gutterBottom display="inline">
                Repository: {repository.name}
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={RouterLink} to="/repositories">
                    Repositories
                </Link>

                <Typography>{repository.name}</Typography>
            </Breadcrumbs>

            <Divider my={6} />

            <Grid container spacing={6}>
                <Grid item xs={12} xl={6}>
                    <Paper p={6} mb={6}>
                        <Typography variant="h4">Repository info</Typography>
                        <RepositoryInfo
                            project={selectedProject}
                            repository={repository}
                            onRepositoryUpdate={reloadRepository}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} xl={6}>
                    <Paper p={6} mb={6}>
                        <Typography variant="h4">Languages</Typography>
                        <SupersetChart chartUrl={chartUrl} />
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default Layout;
