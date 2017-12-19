## 路由设计
- /app/meeting/home ** 首页 **
  - /app/meeting/editor  ``` 编辑会议 ```
        - /app/meeting/editor/home  ``` 编辑会议首页 ```
        - /app/meeting/editor/place  ``` 编辑会议地点 ```
        - /app/meeting/editor/time  ``` 编辑会议时间 ```

  - /app/meeting/reserve  ``` 预约会议 ```
  
  - /app/meeting/room   ``` 会议室 ```
        - /app/meeting/room/list  ``` 会议室列表 ```
        - /app/meeting/room/detail  ``` 会议室详情 ```

  - /app/meeting/summary  ``` 会议纪要 ```
        - /app/meeting/summary/editor ``` 编辑会议 ```
        - /app/meeting/summary/list ``` 纪要列表 ```
        - /app/meeting/summary/detail ``` 纪要详情 ```

  - /app/meeting/my  ``` 我的会议 ```
        - /app/meeting/my/list  ``` 会议列表 ```
        - /app/meeting/my/detail  ``` 会议详情 ```
        - /app/meeting/my/member  ``` 会议成员详情 ```
        - /app/meeting/my/sign  ``` 会议签到详情 ```
        - /app/meeting/my/leave  ``` 会议请假 ```

<!-- ![pageRouter](https://git.hzbox.net/saas/frontend/meeting-app/raw/develop/doc/images/pageRouter.png) -->