import { LuArchive, LuDoorClosed, LuDot, LuHand, LuHandshake, LuHeart, LuMessageCircle, LuSend, LuShirt, LuTimerOff } from 'react-icons/lu';
import { type StatusEnum } from '@/__generated/graphql';
import { Icon } from '@chakra-ui/react';

const iconMap: Record<StatusEnum, React.ReactNode> = {
  APPLIED: <LuSend />,
  ARCHIVED: <LuArchive />,
  CORRESPONDING: <LuMessageCircle />,
  INTERVIEWING: <LuShirt />,
  OFFER_ACCEPTED: <LuHandshake />,
  OFFER_RECEIVED: <LuHand />,
  REJECTED: <LuDoorClosed />,
  SAVED: <LuHeart />,
  STALE: <LuTimerOff />
};

export const StatusIcon: React.FC<{ status: StatusEnum }> = (props) => {
  const { status } = props;

  // in case new status are added in the future and we haven't accounted for them here, we want to return a default icon instead of breaking the UI
  return (
    <Icon display="inline-block" marginRight="2">
      {iconMap[status] || <LuDot />}
    </Icon>
  );
};
