import { Card, CardContent, Typography, Chip, Stack } from "@mui/material";

export function NotificationCard({ notification }) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">
            {notification.title}
          </Typography>

          <Chip label={notification.type} />
        </Stack>

        <Typography variant="body2">
          {notification.message}
        </Typography>

        <Typography variant="caption">
          {notification.timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}