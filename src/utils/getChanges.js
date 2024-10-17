import { changeType } from "./types";

function editStringToNewLength(oldStr, newStr) {
  let inProgressStr = oldStr;
  const changes = [];

  if (oldStr.length === newStr.length) {
    return { inProgressStr, changes };
  }
  console.log(
    `oldStr.length (${oldStr.length}) > newStr.length (${newStr.length})? -> ${
      oldStr.length > newStr.length
    }`
  );
  if (oldStr.length < newStr.length) {
    for (let i = oldStr.length; i < newStr.length; i++) {
      const c = newStr.charAt(i);
      changes.push({
        type: changeType.ADD,
        char: c,
        index: i,
      });
      inProgressStr += c;
    }
  } else {
    for (let i = oldStr.length - 1; i >= newStr.length; i--) {
      changes.push({
        type: changeType.DELETE,
        index: i,
      });
      inProgressStr = inProgressStr.slice(0, i);
    }
  }

  return { changes, inProgressStr };
}

/**
 * Given an old string and new string, returns a list of changes to be sent to server
 */
export default function getChanges(oldStr, newStr) {
  const { changes, inProgressStr } = editStringToNewLength(oldStr, newStr);
  console.log(`inProgressStr = ${inProgressStr}`);

  for (let i = 0; i < inProgressStr.length; i++) {
    const c = newStr.charAt(i);
    if (inProgressStr.charAt(i) !== c) {
      changes.push({
        type: changeType.REPLACE,
        index: i,
        char: c,
      });
    }
  }

  return changes;
}

/*
  Example for "Apple" -> "Ape"

  expected inProgressStr = "Apple"

  expected changes = [
    {
      type: 'DELETE',
      char: 'l',
      index: 3
    },
    {
      type: 'DELETE',
      char: 'e',
      index: 4
    },
    {
      type: 'REPLACE',
      index: 2
      char: 'e',
    },
  ]
  */
