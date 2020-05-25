import React from "react";
import { List, Avatar } from "antd";
import "antd/lib/list/style/css";
import "antd/lib/avatar/style/css";

const { Item } = List;
const { Meta } = Item;

const FavList = ({ favorites }) => (
  <div style={{ height: 300, overflow: "auto" }}>
    <List
      itemLayout="horizontal"
      dataSource={favorites}
      rowKey={(record) => record._id}
      renderItem={(item) => (
        <Item style={{ padding: 10 }}>
          <a
            href={`${item.link}?ref=biblidev.fr`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Meta
              avatar={
                item.logo ? (
                  <Avatar
                    size={32}
                    src={`https://res.cloudinary.com/biblidev/image/upload/${item.logo}`}
                  />
                ) : (
                  <Avatar
                    size={32}
                    style={{
                      backgroundColor: "#ff9c6e",
                    }}
                  >
                    {item.name.charAt(0)}
                  </Avatar>
                )
              }
              title={item.name}
              description={item.description}
            />
          </a>
        </Item>
      )}
    />
  </div>
);

export default FavList;
