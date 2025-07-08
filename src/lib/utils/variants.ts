import { tv } from "tailwind-variants";

export const buttonVariants = tv({
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-slate-900 text-white hover:bg-slate-800",
      destructive: "bg-red-500 text-white hover:bg-red-600",
      outline: "border border-slate-300 bg-white hover:bg-slate-100",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
      ghost: "hover:bg-slate-100 text-slate-900",
      link: "text-blue-600 underline-offset-4 hover:underline",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export const inputVariants = tv({
  base: "flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    variant: {
      default: "border-slate-300 bg-white focus-visible:ring-slate-950",
      error: "border-red-500 bg-white focus-visible:ring-red-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const textareaVariants = tv({
  base: "flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    variant: {
      default: "border-slate-300 bg-white focus-visible:ring-slate-950",
      error: "border-red-500 bg-white focus-visible:ring-red-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const cardVariants = tv({
  base: "rounded-lg border bg-white text-slate-950 shadow-sm",
  variants: {
    variant: {
      default: "border-slate-200",
      outline: "border-slate-300",
      elevated: "border-slate-200 shadow-md",
    },
    padding: {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "none",
  },
});

export const badgeVariants = tv({
  base: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
  variants: {
    variant: {
      default: "bg-slate-900 text-slate-50",
      secondary: "bg-slate-100 text-slate-900",
      destructive: "bg-red-500 text-white",
      outline: "border border-slate-200 text-slate-950",
      success: "bg-green-500 text-white",
      warning: "bg-yellow-500 text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const selectVariants = tv({
  slots: {
    trigger: "flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    content: "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white text-slate-950 shadow-md",
    item: "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    itemIndicator: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
    separator: "-mx-1 my-1 h-px bg-slate-100",
  },
});

export const avatarVariants = tv({
  base: "relative flex shrink-0 overflow-hidden rounded-full",
  variants: {
    size: {
      sm: "h-8 w-8",
      md: "h-10 w-10", 
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const spinnerVariants = tv({
  base: "animate-spin rounded-full border-2 border-solid border-current border-r-transparent",
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
    variant: {
      default: "text-slate-900",
      light: "text-white",
      muted: "text-slate-400",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

export const skeletonVariants = tv({
  base: "animate-pulse bg-slate-200 rounded",
  variants: {
    variant: {
      default: "bg-slate-200",
      circle: "bg-slate-200 rounded-full",
      text: "bg-slate-200 rounded",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const containerVariants = tv({
  base: "mx-auto w-full",
  variants: {
    size: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md", 
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      full: "max-w-full",
    },
    padding: {
      none: "",
      sm: "px-4",
      md: "px-6",
      lg: "px-8",
    },
  },
  defaultVariants: {
    size: "xl",
    padding: "md",
  },
});

export const stackVariants = tv({
  base: "flex",
  variants: {
    direction: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
    spacing: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
      "2xl": "gap-12",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
  },
  defaultVariants: {
    direction: "vertical",
    spacing: "md",
    align: "stretch",
    justify: "start",
  },
});

export const gridVariants = tv({
  base: "grid",
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
      none: "grid-cols-none",
      subgrid: "grid-cols-subgrid",
    },
    rows: {
      1: "grid-rows-1",
      2: "grid-rows-2",
      3: "grid-rows-3",
      4: "grid-rows-4",
      5: "grid-rows-5",
      6: "grid-rows-6",
      none: "grid-rows-none",
      subgrid: "grid-rows-subgrid",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
      "2xl": "gap-12",
    },
    flow: {
      row: "grid-flow-row",
      col: "grid-flow-col",
      dense: "grid-flow-row-dense",
      "col-dense": "grid-flow-col-dense",
    },
  },
  defaultVariants: {
    cols: 1,
    gap: "md",
    flow: "row",
  },
});

export const navbarVariants = tv({
  base: "w-full",
  variants: {
    variant: {
      default: "border-b border-slate-200 bg-white shadow-sm",
      transparent: "bg-transparent",
      elevated: "border-b border-slate-200 bg-white shadow-lg",
    },
    size: {
      sm: "h-12",
      md: "h-16",
      lg: "h-20",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export const navItemVariants = tv({
  base: "inline-flex items-center justify-center px-3 py-2 text-sm font-medium transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
      active: "text-slate-900 bg-slate-100 font-semibold",
      ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const sidebarVariants = tv({
  base: "h-full flex flex-col",
  variants: {
    variant: {
      default: "bg-white border-r border-slate-200",
      bordered: "bg-white border border-slate-200 rounded-lg",
      elevated: "bg-white border-r border-slate-200 shadow-2xl",
    },
    width: {
      sm: "w-48",
      md: "w-64",
      lg: "w-80",
    },
    position: {
      left: "",
      right: "",
    },
  },
  compoundVariants: [
    {
      variant: "default",
      position: "right",
      class: "border-r-0 border-l border-l-slate-200",
    },
    {
      variant: "elevated",
      position: "right",
      class: "border-r-0 border-l border-l-slate-200",
    },
  ],
  defaultVariants: {
    variant: "default",
    width: "md",
    position: "left",
  },
});

export const sidebarItemVariants = tv({
  base: "flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
      active: "text-slate-900 bg-slate-100 font-semibold",
      ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const modalVariants = tv({
  slots: {
    overlay: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
    content: "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 rounded-lg",
    header: "flex flex-col space-y-1.5 text-center sm:text-left",
    title: "text-lg font-semibold leading-none tracking-tight",
    description: "text-sm text-slate-500",
    footer: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    close: "absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-white transition-all hover:opacity-100 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none p-1 text-slate-500 hover:text-slate-900",
  },
  variants: {
    size: {
      sm: {
        content: "max-w-sm",
      },
      md: {
        content: "max-w-lg",
      },
      lg: {
        content: "max-w-2xl",
      },
      xl: {
        content: "max-w-4xl",
      },
      full: {
        content: "max-w-[95vw] max-h-[95vh]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const sheetVariants = tv({
  slots: {
    overlay: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
    content: "fixed z-50 gap-4 bg-white p-6 shadow-lg transition ease-in-out",
    header: "flex flex-col space-y-1.5 text-center sm:text-left",
    title: "text-lg font-semibold leading-none tracking-tight",
    description: "text-sm text-slate-500",
    footer: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    close: "absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-white transition-all hover:opacity-100 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none p-1 text-slate-500 hover:text-slate-900",
  },
  variants: {
    side: {
      top: {
        content: "inset-x-0 top-0 border-b",
      },
      bottom: {
        content: "inset-x-0 bottom-0 border-t",
      },
      left: {
        content: "inset-y-0 left-0 h-full w-1/2 border-r",
      },
      right: {
        content: "inset-y-0 right-0 h-full w-1/2 border-l",
      },
    },
    size: {
      sm: {},
      md: {},
      lg: {},
      xl: {},
      full: {},
    },
  },
  compoundVariants: [
    {
      side: "top",
      size: "sm",
      class: {
        content: "h-1/3",
      },
    },
    {
      side: "top",
      size: "md",
      class: {
        content: "h-1/2",
      },
    },
    {
      side: "top",
      size: "lg",
      class: {
        content: "h-2/3",
      },
    },
    {
      side: "top",
      size: "xl",
      class: {
        content: "h-3/4",
      },
    },
    {
      side: "top",
      size: "full",
      class: {
        content: "h-full",
      },
    },
    {
      side: "bottom",
      size: "sm",
      class: {
        content: "h-1/3",
      },
    },
    {
      side: "bottom",
      size: "md",
      class: {
        content: "h-1/2",
      },
    },
    {
      side: "bottom",
      size: "lg",
      class: {
        content: "h-2/3",
      },
    },
    {
      side: "bottom",
      size: "xl",
      class: {
        content: "h-3/4",
      },
    },
    {
      side: "bottom",
      size: "full",
      class: {
        content: "h-full",
      },
    },
    {
      side: "left",
      size: "sm",
      class: {
        content: "w-64",
      },
    },
    {
      side: "left",
      size: "md",
      class: {
        content: "w-80",
      },
    },
    {
      side: "left",
      size: "lg",
      class: {
        content: "w-96",
      },
    },
    {
      side: "left",
      size: "xl",
      class: {
        content: "w-[32rem]",
      },
    },
    {
      side: "left",
      size: "full",
      class: {
        content: "w-full",
      },
    },
    {
      side: "right",
      size: "sm",
      class: {
        content: "w-64",
      },
    },
    {
      side: "right",
      size: "md",
      class: {
        content: "w-80",
      },
    },
    {
      side: "right",
      size: "lg",
      class: {
        content: "w-96",
      },
    },
    {
      side: "right",
      size: "xl",
      class: {
        content: "w-[32rem]",
      },
    },
    {
      side: "right",
      size: "full",
      class: {
        content: "w-full",
      },
    },
  ],
  defaultVariants: {
    side: "right",
    size: "md",
  },
});

export const dropdownMenuVariants = tv({
  slots: {
    trigger: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    content: "z-50 min-w-32 overflow-hidden rounded-md border border-slate-200 bg-white p-1 text-slate-950 shadow-md",
    item: "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    separator: "mx-1 my-1 h-px bg-slate-100",
    label: "px-2 py-1.5 text-sm font-semibold text-slate-900",
    shortcut: "ml-auto text-xs tracking-widest text-slate-500",
    icon: "mr-2 h-4 w-4",
    arrow: "h-2 w-2 rotate-45 border border-slate-200 bg-white"
  },
  variants: {
    variant: {
      default: {
        trigger: "bg-white border border-slate-300 hover:bg-slate-100",
        item: "hover:bg-slate-100"
      },
      outline: {
        trigger: "border border-slate-300 bg-transparent hover:bg-slate-100",
        item: "hover:bg-slate-100"
      },
      ghost: {
        trigger: "hover:bg-slate-100",
        item: "hover:bg-slate-100"
      }
    },
    size: {
      sm: {
        trigger: "h-8 px-3 text-xs",
        content: "text-xs",
        item: "px-2 py-1 text-xs"
      },
      md: {
        trigger: "h-9 px-4 text-sm",
        content: "text-sm",
        item: "px-2 py-1.5 text-sm"
      },
      lg: {
        trigger: "h-10 px-6 text-base",
        content: "text-base",
        item: "px-3 py-2 text-base"
      }
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});

export const paginationVariants = tv({
  slots: {
    nav: "flex items-center justify-center",
    list: "flex items-center space-x-1",
    item: "flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    ellipsis: "flex items-center justify-center text-slate-500",
    info: "text-sm text-slate-600"
  },
  variants: {
    variant: {
      default: {
        item: "border border-slate-300 bg-white hover:bg-slate-50 data-[active=true]:bg-slate-900 data-[active=true]:text-white data-[active=true]:border-slate-900"
      },
      outline: {
        item: "border border-slate-300 bg-transparent hover:bg-slate-100 data-[active=true]:bg-slate-100 data-[active=true]:border-slate-900"
      },
      ghost: {
        item: "hover:bg-slate-100 data-[active=true]:bg-slate-100"
      }
    },
    size: {
      sm: {
        item: "h-8 w-8 text-xs",
        info: "text-xs"
      },
      md: {
        item: "h-9 w-9 text-sm",
        info: "text-sm"
      },
      lg: {
        item: "h-10 w-10 text-base",
        info: "text-base"
      }
    },
    showInfo: {
      true: {
        nav: "flex-col space-y-2",
        list: "order-1"
      },
      false: {}
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    showInfo: false
  }
});

export const commandPaletteVariants = tv({
  slots: {
    overlay: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
    dialog: "fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border border-slate-200 bg-white shadow-lg duration-200 rounded-lg overflow-hidden",
    header: "flex items-center border-b border-slate-200 px-3",
    searchIcon: "mr-2 h-4 w-4 shrink-0 text-slate-500",
    input: "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50",
    content: "max-h-80 overflow-y-auto overflow-x-hidden",
    empty: "py-6 text-center text-sm text-slate-500",
    group: "overflow-hidden p-1 text-slate-950",
    groupHeading: "px-2 py-1.5 text-xs font-semibold text-slate-500",
    item: "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors aria-selected:bg-slate-100 aria-selected:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    itemIcon: "mr-2 h-4 w-4",
    itemShortcut: "ml-auto text-xs tracking-widest text-slate-500",
    separator: "mx-1 my-1 h-px bg-slate-100"
  },
  variants: {
    size: {
      sm: {
        dialog: "max-w-sm",
        input: "h-9 py-2 text-xs",
        item: "px-2 py-1 text-xs",
        itemIcon: "mr-2 h-3 w-3"
      },
      md: {
        dialog: "max-w-lg",
        input: "h-11 py-3 text-sm",
        item: "px-2 py-1.5 text-sm",
        itemIcon: "mr-2 h-4 w-4"
      },
      lg: {
        dialog: "max-w-xl",
        input: "h-12 py-3 text-base",
        item: "px-3 py-2 text-base",
        itemIcon: "mr-3 h-5 w-5"
      }
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export const popoverVariants = tv({
  slots: {
    content: "z-50 w-72 rounded-md border border-slate-200 bg-white p-4 text-slate-950 shadow-md outline-none",
    arrow: "absolute h-2 w-2 rotate-45 border border-slate-200 bg-white"
  },
  variants: {
    variant: {
      default: {
        content: "border-slate-200 bg-white text-slate-950"
      },
      tooltip: {
        content: "border-slate-800 bg-slate-800 text-white px-3 py-2 text-sm"
      },
      destructive: {
        content: "border-red-200 bg-red-50 text-red-900"
      },
      warning: {
        content: "border-yellow-200 bg-yellow-50 text-yellow-900"
      },
      success: {
        content: "border-green-200 bg-green-50 text-green-900"
      }
    },
    size: {
      sm: {
        content: "w-48 p-2 text-xs"
      },
      md: {
        content: "w-72 p-4 text-sm"
      },
      lg: {
        content: "w-96 p-6 text-base"
      },
      auto: {
        content: "w-auto p-3 text-sm"
      }
    }
  },
  compoundVariants: [
    {
      variant: "tooltip",
      class: {
        arrow: "border-slate-800 bg-slate-800"
      }
    },
    {
      variant: "destructive",
      class: {
        arrow: "border-red-200 bg-red-50"
      }
    },
    {
      variant: "warning",
      class: {
        arrow: "border-yellow-200 bg-yellow-50"
      }
    },
    {
      variant: "success",
      class: {
        arrow: "border-green-200 bg-green-50"
      }
    }
  ],
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});

// Chart Component Variants
export const chartContainerVariants = tv({
  base: "relative bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden",
  variants: {
    size: {
      sm: "w-80 h-60",
      md: "w-[32rem] h-80", 
      lg: "w-[48rem] h-96",
      xl: "w-[60rem] h-[30rem]",
      full: "w-full h-full min-h-96"
    },
    padding: {
      none: "p-0",
      sm: "p-2",
      md: "p-4",
      lg: "p-6"
    }
  },
  defaultVariants: {
    size: "lg",
    padding: "md"
  }
});

export const barChartVariants = tv({
  slots: {
    container: "relative",
    svg: "w-full h-full",
    bar: "transition-all duration-200 hover:opacity-80",
    axis: "stroke-slate-400 stroke-1",
    grid: "stroke-slate-200 stroke-1",
    label: "fill-slate-600 text-xs font-medium",
    tooltip: "absolute z-10 px-2 py-1 bg-slate-800 text-white text-xs rounded shadow-lg pointer-events-none"
  },
  variants: {
    variant: {
      default: {
        bar: "fill-blue-500"
      },
      success: {
        bar: "fill-green-500"
      },
      warning: {
        bar: "fill-yellow-500"  
      },
      danger: {
        bar: "fill-red-500"
      },
      gradient: {
        bar: "fill-url(#gradient)"
      }
    },
    orientation: {
      vertical: {},
      horizontal: {}
    }
  },
  defaultVariants: {
    variant: "default",
    orientation: "vertical"
  }
});