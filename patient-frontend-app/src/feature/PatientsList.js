import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPatients, fetchPatients } from './patientsSlice';

const PatientsList = () => {
  const dispatch = useDispatch()
  const patients = useSelector(selectAllPatients)

  const patientStatus = useSelector((state) => state.patients.status)
  const error = useSelector((state) => state.patients.error)

  useEffect(() => {
    if (patientStatus === 'idle') {
      dispatch(fetchPatients());
    }
  }, [patientStatus, dispatch])

  let content

  if (patientStatus === 'loading') {
    content = <h1>Loading</h1>
  } else if (patientStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    /*const orderedPatients = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))*/

    content = patients.map((patient) => (
      //<div key={post.id} post={post} />
      <p key={patient.id}>{patient.name}</p>
    ))
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

export default PatientsList;
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