import { alpha, Box } from "@mui/material";

type Props = {
  children: string;
};

function Message({ children }: Props) {
  return (
    <Box
      sx={{
        background: alpha("#fff", 0.1),
        px: 1,
        py: 0.5,
        borderRadius: 1,
        border: "solid 1px",
        borderColor: alpha("#fff", 0.3),
        fontSize: "0.8rem",
        opacity: 0.3,
        transition: "opacity 0.2s",

        "&:hover": {
          opacity: 0.7,
        },
      }}
    >
      {children}
    </Box>
  );
}

export default Message;
