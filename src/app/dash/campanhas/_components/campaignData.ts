export type Campaings = {
  id: string
  status: "finished" | "ongoing" | "programmed"
  title: string
}

export const campaignsMock: Campaings[] = [
  { id: "3u1reuv4", status: "finished", title: "Meu natal 2024" },
  { id: "m5gr84i9", status: "ongoing", title: "Amor sobre rodas" },
  { id: "derv1ws0", status: "programmed", title: "Páscoa Automotiva" },
]
