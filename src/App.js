import { useState } from 'react';
import { Formik, Form, Field } from 'formik'
import './header.css'
import './content.css'
import './article.css'

const App = () => {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  console.log({ photos})
  return (
    <>
      <header>
        <Formik
        initialValues={{ search: '' }}
        onSubmit={async values => {
          const response =  await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
            headers: {
              'Authorization': 'Client-ID 3jd6cOqSYthJ0xJR0FOhubOQHR1pE21IppQCH_ND7Ko'
            }
          })
          const data = await response.json()
          // Lamara a api de unsplash
          setPhotos(data.results)
        }}
        >
          <Form>
            <Field name='search' />
          </Form>
        </Formik>
      </header>
      <div class="container">
        <div className="center">
          {photos.map(photo => 
          <article key={photo.id} onClick={() => open(photo.links.html)}>
            <img src={photo.urls.regular} />
            <p>{[photo.description, photo.alt_description].join(' - ')}</p>
          </article>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
