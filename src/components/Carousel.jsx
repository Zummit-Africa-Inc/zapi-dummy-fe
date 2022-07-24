import React from 'react'
import { Link } from 'react-router-dom'
import { Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Textbox } from './index'
import { useFetch } from '../services/useFetch'

const base_url = process.env.REACT_APP_BASE_URL

const useStyles = makeStyles({
  carousel_container: {
    width: '100%',
    height: '300px',
    position: 'relative',
    margin: '0 0.5rem',
    padding: '0 1rem',
  },
  carousel: {
    width: '100%',
    height: '100%',
  },
})

const CarouselComponent = ({ header, description, category }) => {
  const classes = useStyles()
  const { data } = useFetch(`${base_url}/api`)

  const arrayData = (name, id ) => {
    return { name, id }
}

  const array = []
  data.map((api) => {
    array.push(arrayData(api.name, api.id))
  })

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 763 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 763, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <Stack direction='column' width='100%'>
      <Stack direction='row' width='100%' alignItems='center' justifyContent='space-between' mb={1}>
      <Typography variant='h5'>
        {header}
      </Typography>
      <Link to={`/api/categories/${category}`}>
        View All
      </Link>
      </Stack>
      <Typography variant='body2' color='textPrimary' mb={2}>
        {description}
      </Typography>
      {/* Carousel */}
      <Stack alignItems='center' justifyContent='center'>
        <Stack className={classes.carousel_container}>
          <Carousel responsive={responsive} arrows={true} swipeable={true} draggable={true} showDots={true} infinite={true} autoPlay={false} keyBoardControl={true} transitionDuration={500} itemClass={classes.carousel}>
            {array.map(item => (
              <Textbox key={item.id} name={item.name} id={item.id} />
            ))}
          </Carousel>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default CarouselComponent