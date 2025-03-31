import { useState, useEffect, useMemo } from "react";
import { Box, Tabs, Tab, Typography, AppBar } from "@mui/material";
import { SchoolOutlined } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

function samePageLinkNavigation(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

interface LinkTabProps {
  label?: string;
  href?: string;
  selected?: boolean;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component={Link}
      to={props.href || "/"}
      aria-current={props.selected ? "page" : undefined}
      {...props}
      sx={{
        height: "100%",
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        textTransform: "none",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#1058a0",
      }}
    />
  );
}

export default function NavTabs() {
  const location = useLocation();
  const tabs = [
    { label: "Classes", href: "/classes" },
    { label: "Teachers", href: "/teachers" },
  ];

  // Ensure "/" defaults to Teachers page
  const currentTabIndex = useMemo(() => {
    const pathname =
      location.pathname === "/" ? "/teachers" : location.pathname;
    const match = tabs.findIndex((tab) => pathname.startsWith(tab.href || ""));
    return match === -1 ? 0 : match;
  }, [location.pathname]);

  const [value, setValue] = useState(currentTabIndex);

  useEffect(() => {
    setValue(currentTabIndex);
  }, [currentTabIndex]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (
      event.type !== "click" ||
      (event.type === "click" &&
        samePageLinkNavigation(
          event as React.MouseEvent<HTMLAnchorElement, MouseEvent>
        ))
    ) {
      setValue(newValue);
    }
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      color="transparent"
      sx={{
        height: "70px",
        px: 4,
        borderBottom: "1px solid #e0e0e0",
        bgcolor: "white",
      }}
    >
      <Box
        gap={8}
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <SchoolOutlined sx={{ color: "#1058a0" }} />
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#1058a0",
              fontSize: "18px",
            }}
          >
            School Portal
          </Typography>
        </Box>

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="navigation tabs"
          role="navigation"
          slotProps={{
            indicator: {
              sx: {
                height: "3px",
                backgroundColor: "#1058a0",
                bottom: 0,
              },
            },
          }}
          sx={{
            height: "100%",
            minHeight: 0,
            "& .MuiTabs-scroller": {
              height: "100%",
              display: "flex",
              alignItems: "center",
            },
            "& .MuiTabs-flexContainer": {
              height: "100%",
            },
          }}
        >
          <LinkTab label="Classes" href="/classes" />
          <LinkTab label="Teachers" href="/teachers" />
        </Tabs>
      </Box>
    </AppBar>
  );
}
