function assertUserOrOwner(str?: string): asserts str is "user" | "owner" {
  if (typeof str !== "string" || (str !== "user" && str !== "owner")) {
    throw new Error("Invalid user or owner");
  }
}

export { assertUserOrOwner };
