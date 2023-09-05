import { renderHook, waitFor } from "@testing-library/react";
import { server } from "../mocks/server";
import { useGetTodosQuery } from "../api";
import { Provider } from "react-redux";
import { storeQuery } from "../pages/store/store";
import { expect } from "vitest";

beforeAll(() => server.listen()); // roda antes de todos os teste

afterEach(() => server.resetHandlers()); // roda depois de cada teste

afterAll(() => server.close()); // roda depois que todos os teste acabam

describe("RTKquery ", () => {
  const wrapper = ({ children }) => (
    <Provider store={storeQuery}>{children}</Provider>
  );
  test(" useGetTodosQuery", async () => {
    const { result } = renderHook(() => useGetTodosQuery(), { wrapper });
    waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
});
