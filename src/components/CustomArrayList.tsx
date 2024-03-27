import * as React from "react";
import { Chip, Stack, StackProps, styled } from "@mui/material";
import PropTypes from "prop-types";
import {
  sanitizeListRestProps,
  useListContext,
  useResourceContext,
  useRecordContext,
  RaRecord,
  RecordContextProvider,
  RecordRepresentation,
  ComponentPropType,
  useCreatePath,
} from "ra-core";
import get from "lodash/get";
import { LinearProgress, Link } from "react-admin";

export const CustomArrayList = (props: any) => {
  const record = useRecordContext(props);
  const {
    className,
    children,
    empty,
    source,
    linkType = "edit",
    gap = 1,
    direction = "row",
    ...rest
  } = props;
  //const { data, total, isLoading } = useListContext(props);
  const data = get(record, source);
  let records: any[] = [];
  for (let index = 0; index < data.length; index++) {
    const value = "" + data[index];
    records[index] = {
      id: index,
      name: value.trim(),
    };
  }
  const isLoading: boolean = false;
  const total = data ? data.length : 0;
  const resource = useResourceContext(props);
  const createPath = useCreatePath();

  if (isLoading) {
    return <LinearProgress />;
  }

  if (data == null || data.length === 0 || total === 0) {
    if (empty) {
      return empty;
    }

    return null;
  }

  return (
    <Root
      gap={gap}
      direction={direction}
      className={className}
      {...sanitizeListRestProps(rest)}
    >
      {records.map((record: any, rowIndex: number) => {
        const resourceLinkPath = !linkType
          ? false
          : createPath({
              resource,
              type: linkType,
              id: record.id,
            });

        if (resourceLinkPath) {
          return (
            <RecordContextProvider
              value={record}
              key={record.id ?? `row${rowIndex}`}
            >
              <Link
                className={SingleFieldListClasses.link}
                to={resourceLinkPath}
                onClick={stopPropagation}
              >
                {children || <DefaultChildComponent clickable />}
              </Link>
            </RecordContextProvider>
          );
        }

        return (
          <RecordContextProvider
            value={record}
            key={record.id ?? `row${rowIndex}`}
          >
            {children || <DefaultChildComponent />}
          </RecordContextProvider>
        );
      })}
    </Root>
  );
};

CustomArrayList.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  component: ComponentPropType,
  source: PropTypes.any,
  empty: PropTypes.element,
  // @ts-ignore
  linkType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  resource: PropTypes.string,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export interface SingleFieldListProps<RecordType extends RaRecord = any>
  extends StackProps {
  className?: string;
  empty?: React.ReactElement;
  linkType?: string | false;
  children?: React.ReactNode;
  // can be injected when using the component without context
  data?: RecordType[];
  total?: number;
  loaded?: boolean;
}

const PREFIX = "RaSingleFieldList";

export const SingleFieldListClasses = {
  link: `${PREFIX}-link`,
};

const Root = styled(Stack, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  flexWrap: "wrap",
  [`& .${SingleFieldListClasses.link}`]: {
    textDecoration: "none",
    "& > *": {
      color: theme.palette.primary.main,
    },
  },
}));

// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = (e: any) => e.stopPropagation();

const DefaultChildComponent = ({ clickable }: { clickable?: boolean }) => (
  <Chip
    sx={{ cursor: "inherit" }}
    size="small"
    label={<RecordRepresentation />}
    clickable={clickable}
  />
);
