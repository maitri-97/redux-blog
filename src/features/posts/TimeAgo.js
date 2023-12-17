import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp} className="text-muted fs-12px">
      <i className="far fa-clock me-1"></i>{timeAgo}
    </span>
  );
};
export default TimeAgo;
