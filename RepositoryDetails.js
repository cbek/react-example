import React from "react";
import styled from "styled-components";

import Helmet from 'react-helmet';

import MuiPaper from "@material-ui/core/Paper";

import {
    Breadcrumbs as MuiBreadcrumbs,
    Divider as MuiDivider,
    Grid,
    Link,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from "@material-ui/core";

import {spacing} from "@material-ui/system";
import {Link as RouterLink, useParams} from "react-router-dom";
import SupersetChart from "../components/superset/SupersetChart";
import {person_languages_url} from "../../utils/superset";
import {useOne} from "../../context/OneContext";
import {useProjectsRepositoriesRead} from "../../api-client/one-api";

const Paper = styled(MuiPaper)(spacing);

const TableCellLabel = styled(TableCell)`
  width: 200px;
  text-align: right;
`;


const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const RepositoryInfo = ({repository}) => {

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCellLabel variant="head">
                        Name
                    </TableCellLabel>
                    <TableCell>
                        {repository.name}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

const RepositoryDetails = () => {
    const {selectedProject} = useOne();
    let {id: repositoryId} = useParams();

    const {data: repository, refetch: reloadRepository} = useProjectsRepositoriesRead({
        project_pk: selectedProject ? selectedProject.id : undefined,
        repository_pk: repositoryId,
        lazy: !Boolean(selectedProject)
    });

    const chartUrl = repository ?
        person_languages_url('repository', repository.name)
        :
        undefined

    return (
        <React.Fragment>
            <Helmet title={`Repository: ${repository && repository.name}`}/>
            <Typography variant="h3" gutterBottom display="inline">
                Repository: {repository && repository.name}
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={RouterLink} to="/repositories">
                    Repositories
                </Link>

                <Typography>{repository && repository.name}</Typography>
            </Breadcrumbs>

            <Divider my={6}/>

            <Grid container spacing={6}>
                <Grid item xs={12} xl={6}>
                    <Paper p={6} mb={6}>
                        <Typography variant="h4">Repository info</Typography>
                        {repository && (
                            <RepositoryInfo project={selectedProject} repository={repository}
                                      onRepositoryUpdate={reloadRepository}/>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} xl={6}>
                    <Paper p={6} mb={6}>
                        <Typography variant="h4">Languages</Typography>
                        <SupersetChart chartUrl={chartUrl}/>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default RepositoryDetails;
