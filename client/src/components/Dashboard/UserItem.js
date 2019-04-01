import React from "react";
import {
  TableCell,
  Tooltip,
  IconButton,
  Typography,
  Link
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Visibility from "@material-ui/icons/Visibility";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/profileAction";
import { Link as LinkRouter } from "react-router-dom";
import { modalContent } from "../../actions/platesAction";

const UserItem = ({ project, index, deleteProject }) => {
  const handleDelete = id => {
    modalContent(
      "Bạn có chắn chắn ?",
      "Sau khi xóa, bạn sẽ không thể khôi phục dữ liệu này!"
    ).then(del => {
      if (del) {
        deleteProject(id);
      }
    });
  };
  return (
    <>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{project.handle}</TableCell>
      <TableCell style={{ fontSize: "1rem" }}>
        <Link component={LinkRouter} to={`/dashboard/${project._id}`}>
          {project.create_date}
        </Link>
      </TableCell>
      <TableCell>
        {project.profile.map(item => (
          <Typography noWrap gutterBottom key={item.licensePlates}>
            {item.licensePlates}
          </Typography>
        ))}
      </TableCell>
      <TableCell>
        <Tooltip title="Xem chi tiết">
          <IconButton component={LinkRouter} to={`/dashboard/${project._id}`}>
            <Visibility />
          </IconButton>
        </Tooltip>

        <Tooltip title="Xóa">
          <IconButton onClick={() => handleDelete(project._id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </>
  );
};

export default connect(
  null,
  { deleteProject }
)(UserItem);
