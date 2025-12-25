// Centralized events constants that can be imported across the app
// Images must come from public/images

export type EventItem = {
  title: string;
  image: string; // path under /public/images
  slug: string;
  location: string;
  date: string; // e.g., "2026-02-10" (ISO) or readable string
  time: string; // local time with timezone if needed
};

// Curated list of realistic, upcoming/popular developer events and hackathons
// Note: Multiple items reuse existing placeholder images in /public/images
export const events: EventItem[] = [
  {
    image: "/images/event1.png",
    title: "JSConf EU 2026",
    slug: "jsconf-eu-2026",
    location: "Berlin, Germany",
    date: "2026-05-22",
    time: "09:00 CET",
  },
  {
    image: "/images/event2.png",
    title: "React Summit Amsterdam 2026",
    slug: "react-summit-ams-2026",
    location: "Amsterdam, Netherlands",
    date: "2026-06-12",
    time: "10:00 CEST",
  },
  {
    image: "/images/event1.png",
    title: "AWS re:Invent 2025",
    slug: "aws-reinvent-2025",
    location: "Las Vegas, NV, USA",
    date: "2025-12-01",
    time: "08:30 PST",
  },
  {
    image: "/images/event2.png",
    title: "HashiConf Global 2026",
    slug: "hashiconf-global-2026",
    location: "Austin, TX, USA",
    date: "2026-04-07",
    time: "09:00 CDT",
  },
  {
    image: "/images/event1.png",
    title: "ETHGlobal Hackathon: Paris 2026",
    slug: "ethglobal-paris-2026",
    location: "Paris, France",
    date: "2026-07-03",
    time: "18:00 CEST",
  },
  {
    image: "/images/event2.png",
    title: "Google Cloud Next 2026",
    slug: "google-cloud-next-2026",
    location: "San Francisco, CA, USA",
    date: "2026-03-18",
    time: "09:00 PDT",
  },
  {
    image: "/images/event1.png",
    title: "KubeCon + CloudNativeCon Europe 2026",
    slug: "kubecon-europe-2026",
    location: "Vienna, Austria",
    date: "2026-05-04",
    time: "09:00 CEST",
  },
  {
    image: "/images/event2.png",
    title: "Open Source Summit North America 2026",
    slug: "oss-na-2026",
    location: "Vancouver, Canada",
    date: "2026-06-23",
    time: "09:30 PDT",
  },
];
