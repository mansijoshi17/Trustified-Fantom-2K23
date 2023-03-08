import Iconify from "./Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  // {
  //   title: "Certificates",
  //   path: "/dashboard/templates",
  //   icon: getIcon("eos-icons:templates-outlined"),
  // },
  {
    title: "Badges",
    path: "/dashboard/badge",
    icon: getIcon("mdi:police-badge-outline"),
  },
  {
    title: "Certificates",
    path: "/dashboard/collection",
    icon: getIcon("material-symbols:collections-bookmark-outline"),
  }, 
  // {
  //   title: "temp",
  //   path: "/dashboard/temp",
  //   icon: getIcon("material-symbols:collections-bookmark-outline"),
  // }, 
  // {
  //   title: "Broadcast",
  //   path: "/dashboard/broadcast",
  //   icon: getIcon("emojione-v1:page-with-curl"),
  // },
];

export default sidebarConfig;
