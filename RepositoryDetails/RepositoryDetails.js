import React from "react";
import {useParams} from "react-router-dom";
import {person_languages_url} from "../../utils/superset";
import {useOne} from "../../context/OneContext";
import {useProjectsRepositoriesRead} from "../../api-client/one-api";
import Layout from "./Layout";

const RepositoryDetails = () => {
    const {selectedProject} = useOne();
    const {id: repositoryId} = useParams();

    const {data: repository, refetch: reloadRepository} =
        useProjectsRepositoriesRead({
            project_pk: selectedProject?.id,
            repository_pk: repositoryId,
            lazy: !selectedProject,
        });

    const chartUrl = repository
        ? person_languages_url("repository", repository.name)
        : undefined;

    return (
        <Layout
            repository={repository}
            selectedProject={selectedProject}
            reloadRepository={reloadRepository}
            chartUrl={chartUrl}
        />
    );
};

export default RepositoryDetails;
