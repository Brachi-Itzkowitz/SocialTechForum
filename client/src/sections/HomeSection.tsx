
import { Box, Typography } from '@mui/material';

export const HomeSection = () => {
    return (
        <Box sx={{
            maxWidth: 600,
            margin: '60px auto 30px auto',
            p: 4,
            borderRadius: 5,
            background: 'rgba(255,255,255,0.65)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
            border: '1.5px solid rgba(255,255,255,0.35)',
            backdropFilter: 'blur(8px)',
            textAlign: 'center',
        }}>
            <Typography variant="h2" color="primary" sx={{ fontWeight: 800, letterSpacing: 2, mb: 2 }}>
                Welcome
            </Typography>
            <Typography variant="h4" color="secondary" sx={{ fontWeight: 600, mb: 1 }}>
                Social Network!!!
            </Typography>
        </Box>
    );
}