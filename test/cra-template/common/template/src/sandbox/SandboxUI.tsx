import React, { useCallback, useState } from 'react';
import { Badge, Button, Col, Container, Image, ImageProps, Modal, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import { CommentsContext } from './Comments';
import { OpenIDE } from './common';
import githubIcon from './GitHub-Mark-64px.png';
import { GitInfo, SANDBOX_DEPLOYED, useDeployCodeSandbox, useGitInfo, useShowComments, useShowModal } from './hooks';
import diff from '../diff/upstream.diff';

const PatchIcon = React.memo((props: ImageProps & React.RefAttributes<HTMLImageElement>) =>
  <Image
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'%3E%3Ctitle%3EBandage%3C/title%3E%3Crect x='-24.43' y='167.88' width='560.87' height='176.25' rx='88.12' ry='88.12' transform='rotate(-45 256 256.002)' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/%3E%3Crect x='169.41' y='156.59' width='176' height='196' rx='32' ry='32' transform='rotate(45 257.409 254.582)' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/%3E%3Ccircle cx='256' cy='208' r='16'/%3E%3Ccircle cx='304' cy='256' r='16'/%3E%3Ccircle cx='208' cy='256' r='16'/%3E%3Ccircle cx='256' cy='304' r='16'/%3E%3C/svg%3E"
    width={24}
    className="mx-2"
    {...props}
  />
);

const GitInfoDisplay = React.memo(({ user, branch, tag, changes }: GitInfo) => {
  return (
    <Container className="p-2">
      <Row>
        <Col md="auto">user</Col>
        <Col ><code>{user}</code></Col>
      </Row>
      <Row>
        <Col md="auto">branch</Col>
        <Col><code>{branch}</code></Col>
      </Row>
      <Row>
        <Col md="auto">tag</Col>
        <Col><code>{tag}</code></Col>
      </Row>
      <Row className="my-3">
        {changes.length > 0 && <strong>This branch has uncommitted changes</strong>}
      </Row>
    </Container>
  );
});

const GitActions = React.memo((info?: Partial<GitInfo> | null) => {
  const { user, tag } = info || { tag: undefined, user: 'fabricjs' };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Using <code>.diff</code> files</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Commit your local changes before proceeding.</h5>
        <p>
          The following commands update your local <code>fabric</code> repository with the changes from this sandbox, run them for that folder.
        </p>
        <div className="my-4">
          <h6>
            Merge
          </h6>
          <div className="m-2">
            <code>
              git fetch upstream<br />
              git merge {tag || '<tag>'}
            </code>
          </div>
        </div>
        <div className="my-4">
          <h6>
            Checkout (overwrite) local files
          </h6>
          <div className="m-2">
            <code>
              git fetch upstream<br />
              git checkout {tag || '<tag>'} -- [file]
            </code>
          </div>
        </div>
        <div className="my-4">
          <h6>
            Apply changes manually
          </h6>
          <div className="m-2">
            <code>
              git apply {'<path/to/downloaded/.diff>'}
            </code>
          </div>
        </div>
        <div className="my-4">
          <h6>
            Apply changes manually only to the build folder <code>dist</code>
          </h6>
          <div className="m-2">
            <code>
              git apply --include dist/fabric.js {'<path/to/downloaded/.diff>'}
            </code>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        {
          info &&
          <div className="my-4">
            <h6>
              <Image
                src={githubIcon}
                width={24}
                className="mx-2"
              />
              Github info
            </h6>
            <GitInfoDisplay {...(info as GitInfo)} />
          </div>
        }
        <div>
          <Button
            as="a"
            href={`https://github.com/${user}/fabric.js/tree/${tag || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline-primary"
            className="mx-2"
          >
            Browse repository
          </Button>
          <Button
            as="a"
            href={diff}
            download="fabric.diff"
            variant="outline-success"
            className="mx-2"
          >
            Download <code>.diff</code> file
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
});

function SandboxUI({ children, hidden }: { children: React.ReactNode, hidden?: boolean }) {
  const [pending, deployCodeSandbox] = useDeployCodeSandbox();
  const gitInfo = useGitInfo();
  const [showModal, setShowModal] = useShowModal();
  const comments = useShowComments()
  const [showComments, setShowComments] = comments;
  const hideModal = useCallback(() => {
    setShowModal(0);
    showComments === -1 && setShowComments(1);
  }, [showComments, setShowModal, setShowComments]);
  const [showGitActions, setShowGitActions] = useState(false);
  const [showPatching, setShowPatching] = useState(false);

  return hidden ?
    <>{children}</> :
    (
      <div className="App">
        <header className="App-header my-3">
          <div className="f1 flex justify-content-evenly">
            <OverlayTrigger
              overlay={
                <Tooltip id="git">
                  <p className="m-3">
                    <div><strong>Patching fabric?</strong></div>
                    Click for details
                  </p>
                </Tooltip>
              }
              trigger={['focus', 'hover']}
              flip
              placement="bottom"
            >
              <Button
                onClick={() => setShowPatching(true)}
                variant="light"
              >
                <PatchIcon width={48} />
              </Button>
            </OverlayTrigger>
            {
              gitInfo &&
              <div className="flex">
                <OverlayTrigger
                  overlay={
                    <Tooltip id="git">
                      <p className="m-3">
                        <strong>Click for more options</strong>
                      </p>
                      <GitInfoDisplay {...gitInfo} />
                    </Tooltip>
                  }
                  trigger={['focus', 'hover']}
                  flip
                  placement="bottom"
                >
                  {({ ref, ...props }) =>
                    <div className="position-relative" {...props}>
                      <Button
                        ref={ref}
                        onClick={() => setShowGitActions(true)}
                        variant="light"
                      >
                        <Image
                          src={githubIcon}
                          width={48}
                        />
                      </Button>
                      {gitInfo.changes.length > 0 && <Badge className="github" bg="secondary"><small>Uncommitted Changes</small></Badge>}
                    </div>
                  }
                </OverlayTrigger>
              </div>
            }
          </div>
          <div className="f1">
            <h2>
              <strong>Fabric.js</strong> React Sandbox
            </h2>
          </div>
          <div className="f1">
            <Button
              as="a"
              href="http://fabricjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              variant="link"
            >
              Docs
            </Button>
            <Button
              as="a"
              href="https://github.com/fabricjs/fabric.js/blob/master/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              variant="link"
            >
              Contribution Guide
            </Button>
            {
              !SANDBOX_DEPLOYED &&
              <Button
                onClick={deployCodeSandbox}
                disabled={pending}
                variant="outline-success"
              >
                {
                  pending ?
                    <Spinner animation="border" /> :
                    <>
                      Deploy to codesandbox
                      <Image src="https://codesandbox.io/csb-ios.svg" width={24} className="mx-1" />
                    </>
                }
              </Button>
            }
          </div>
        </header>
        <CommentsContext.Provider value={comments}>
          {children}
        </CommentsContext.Provider>
        <Button
          onClick={() => setShowComments(1)}
          variant="outline-success"
        >
          Show Comments
          <Image src=" https://unpkg.com/ionicons@latest/dist/svg/information-circle-outline.svg" width={24} className="mx-1" />
        </Button>
        <Modal
          show={showModal === 1}
          onHide={hideModal}
          backdrop="static"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Welcome to Fabric.js React Sandbox</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <h5>Overview</h5>
              This tool is designed for developers working on <code>fabric</code>.
              It is a great place for live testing!<br />
              The app's server watches for changes on <code>fabric</code>. All you need to do is <strong>start coding!</strong><br />
            </p>
            <p>
              <h5>Working on the App</h5>
              To edit this test app open <OpenIDE />.<br />
              You will notice there are actions available to make developing much simpler, the most awesome is <strong>deploying to codesandbox</strong>.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={hideModal}>Let's get started</Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showGitActions}
          onHide={() => setShowGitActions(false)}
          backdrop="static"
          centered
          size="lg"
        >
          <GitActions {...gitInfo} />
        </Modal>
        <Modal
          show={showPatching}
          onHide={() => setShowPatching(false)}
          backdrop="static"
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Patching <strong>fabric</strong> with <code>.diff</code> files
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="my-4">
              <h6>
                <PatchIcon />
                Looking to patch <strong>fabric</strong> in an existing project using a package manager?
              </h6>
              <div className="m-2">
                Add a <code>postinstall</code> script to your <code>package.json</code> applying the <code>.diff</code> to <code>dist</code>.<br />
              </div>
            </div>
            <div className="my-4">
              <h6>
                <PatchIcon />
                Using <code>yarn berry</code>?
              </h6>
              <div className="m-2">
                If you're using <code>yarn berry</code> you need to use the <a
                  href="https://yarnpkg.com/features/protocols#patch"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  patch protocol
                </a> by changing the depency in your <code>package.json</code> file.<br />
                <code>fabric: "patch:fabric@<strong>{"\<"}semver_version{"\>"}</strong>#./<strong>{"\<"}path/to/.diff/file{"\>"}</strong>"</code><br />
                <strong>e.g.</strong><br />
                <code>patch:fabric@<strong>latest</strong>#./<strong>fabric.diff</strong></code><br />
                <code>fabric.diff</code> is the generated <code>.diff</code> file located in your app's root.
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setShowGitActions(true)}
              variant="outline-primary"
            >
              Using <code>.diff</code> files
            </Button>
            <Button
              as="a"
              href={diff}
              download="fabric.diff"
              variant="outline-success"
              className="mx-2"
            >
              Download <code>.diff</code> file
            </Button>
          </Modal.Footer>
        </Modal>
      </div >
    );
}

export default SandboxUI;