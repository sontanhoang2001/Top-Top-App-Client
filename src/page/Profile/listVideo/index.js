import { useState } from "react";
import { Box, Grid, ImageList, ImageListItem } from "@mui/material";
import { useEffect } from "react";
import useResponsive from '~/hooks/useResponsive';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';

const itemData = [{
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?w=164&h=164&fit=crop&auto=format"
},
{
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=164&h=164&fit=crop&auto=format"
},
{
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=164&h=164&fit=crop&auto=format"
},
{
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=164&h=164&fit=crop&auto=format"
},
{
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=164&h=164&fit=crop&auto=format"
},
{
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=164&h=164&fit=crop&auto=format"
},
{
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=164&h=164&fit=crop&auto=format"
},
{
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=164&h=164&fit=crop&auto=format"
},
{
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=164&h=164&fit=crop&auto=format"
},
{
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=164&h=164&fit=crop&auto=format"
}]

function ListVideo({ index }) {
    const smUp = useResponsive('up', 'sm');
    const mdUp = useResponsive('up', 'md');
    const [imageListCol, setImageListCol] = useState();
    useEffect(() => {
        if (smUp) {
            setImageListCol(3);
        } else {
            setImageListCol(2);
        }
    })

    return (<>
        {/* <Grid container spacing={2}>
            <Grid item xs={12} md={12} sx={{ mt: 2 }}> */}
                <ImageList sx={{ width: '100%', minHeight: 350 }} cols={imageListCol} gap={10} component='span'>
                    {itemData.map((item, index) => (
                        <ImageListItem key={index} sx={{cursor: 'pointer'}} component='div'>
                            <img
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                            <div style={{ display: 'flex', position: 'absolute', bottom: '5px', left: '5px', color: '#fff'}}><PlayArrowOutlinedIcon /> 18</div>
                        </ImageListItem>
                    ))}
                </ImageList>
            {/* </Grid>
        </Grid> */}
    </>);
}

export default ListVideo;