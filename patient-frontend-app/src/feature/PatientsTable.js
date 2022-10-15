import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPatients, fetchPatients } from './patientsSlice';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170, align: "center" },
  { id: 'barcode', label: 'Barcode', minWidth: 170, align: "center" },
  {
    id: 'filter_barcode',
    label: 'Filter Barcode',
    minWidth: 170,
    align: "center"
  },
];

const PatientsTable = () => {
  const dispatch = useDispatch()
  const patients = useSelector(selectAllPatients)

  const patientStatus = useSelector((state) => state.patients.status)
  const error = useSelector((state) => state.patients.error)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    if (patientStatus === 'idle') {
      dispatch(fetchPatients());
    }
  }, [patientStatus, dispatch])

  let content

  if (patientStatus === 'loading') {
    content = <h1>Loading</h1>
  } else if (patientStatus === 'succeeded') {
    console.log("patients:", patients);
    content = (
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {patients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((patient) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={patient._id}>
                      {columns.map((column) => {
                        const value = patient[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={patients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      //<div key={post.id} post={post} />
      //<p key={patient.id}>{patient.name}</p>
    )
  } else if (patientStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Patients</h2>
      {content}
    </section>
  )
}

export default PatientsTable;
/*
const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}
*/