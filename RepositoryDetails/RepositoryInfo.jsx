import {Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import styled from "styled-components";

const TableCellLabel = styled(TableCell)`
    width: 200px;
    text-align: right;
`;

const RepositoryInfo = ({repository}) => (
    <Table>
        <TableBody>
            <TableRow>
                <TableCellLabel variant="head">Name</TableCellLabel>
                <TableCell>{repository.name}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

export default RepositoryInfo;
