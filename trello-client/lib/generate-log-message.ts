import { ACTION, AuditLog } from "@prisma/client";

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log;
  switch (action) {
    case ACTION.CERATE:
      return `created ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
    case ACTION.UPDATE:
      return `updated ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
    case ACTION.DELETE:
      return `delete ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
    default:
      return `unknown action ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
  }
};
