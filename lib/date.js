const { format, formatDistanceToNow } = require("date-fns");

export const dateFmtRelative = (dt) => formatDistanceToNow(dt);

export const dateFmt = (dt) => format(dt, "HH:mm:ss XX EEEE, io 'of' MMMM");
