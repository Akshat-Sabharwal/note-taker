import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

export const BreadCrumb = ({ links }) => {
  return (
    <Breadcrumb fontSize="lg" separator={<ChevronLeftIcon />} mt={3}>
      {links
        ? links.reverse().map((link) => (
            <BreadcrumbItem>
              <BreadcrumbLink href={link.link}>{link.name}</BreadcrumbLink>
            </BreadcrumbItem>
          ))
        : null}
    </Breadcrumb>
  );
};
