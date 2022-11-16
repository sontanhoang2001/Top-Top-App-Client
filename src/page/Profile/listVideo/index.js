import { Grid, ImageList, ImageListItem } from "@mui/material";

// 


function ListVideo() {
    return (<>
        <Grid container spacing={2}>
            <Grid item xs={12} md={12} sx={{ mt: 2 }}>
                <ImageList sx={{ width: '100%', minHeight: 350 }} cols={imageListCol} gap={10}>
                    {itemData.map((item, index) => (
                        <ImageListItem key={index}>
                            <img
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
        </Grid>
    </>);
}

export default ListVideo;