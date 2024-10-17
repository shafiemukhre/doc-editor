/**
 * Given a set of changes, save to DB, and returned the server's response
 */
export async function save(changes) {
  try {
    const res = await fetch("/api/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        changes,
      }),
    });

    const data = await res.json();
    return data.content;
  } catch (error) {
    console.error("Failed to save to DB", error);
  }
}

export async function clear() {
  try {
    await fetch("/api/clear", {
      method: "PUT",
    });
  } catch (error) {
    console.error("Failed to clear the DB", error);
  }
}

/**
 * Get the latest state from server
 */
export async function getServerState() {
  const res = await fetch("/api/doc");
  const data = await res.json();

  return data.content;
}
