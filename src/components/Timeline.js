import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent, { timelineContentClasses } from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import Typography from '@mui/material/Typography';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import Groups3Icon from '@mui/icons-material/Groups3';

export default function CustomizedTimeline() {
  return (
    <Timeline class = 'timeline' >
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="secondary">
            <PlayCircleFilledIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography style={{fontSize:'30px'}} variant="h6" component="span">
            Start Exploring
          </Typography >
          <Typography style={{fontSize:'16px', color:'#ababab'}}>Checkout amazing Hackathons and Projects to take part</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography style={{fontSize:'30px'}} variant="h6" component="span">
            Find the Team
          </Typography>
          <Typography style={{fontSize:'16px', color:'#ababab'}}>Look for the team which you feel would be the best for you</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            <RecordVoiceOverIcon  />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
        </TimelineSeparator>
        <TimelineContent  sx={{ py: '12px', px: 2 }}>
          <Typography style={{fontSize:'30px'}} variant="h6" component="span">
            Send a Request
          </Typography>
          <Typography style={{fontSize:'16px', color:'#ababab'}}>Send your request to Original Poster and have a conversation over chat</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
          <TimelineDot color="secondary">
            <Groups3Icon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography style={{fontSize:'30px'}} variant="h6" component="span">
            Build the Dream
          </Typography>
          <Typography style={{fontSize:'16px', color:'#ababab'}}>Working with a group of people who are as enthusiastic as you is amazing right?</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}